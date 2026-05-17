import urllib.request, urllib.parse, re, json, os, time
from html.parser import HTMLParser

CATEGORIES = {
  18: 'OT', 19: 'ST', 21: 'PT', 22: '推拿', 33: '社交融合',
}
CAT_NAME = {
  18: '作业治疗 OT', 19: '言语认知 ST', 21: '运动训练 PT',
  22: '儿童推拿', 33: '社交融合',
}

def http(url, data=None):
  req = urllib.request.Request(url, data=urllib.parse.urlencode(data).encode() if data else None,
                                headers={'User-Agent':'Mozilla/5.0','X-Requested-With':'XMLHttpRequest'})
  return urllib.request.urlopen(req, timeout=20).read()

def strip_html(s):
  s = re.sub(r'<br\s*/?>', '\n', s)
  s = re.sub(r'</p>', '\n', s)
  s = re.sub(r'<[^>]+>', '', s)
  s = s.replace('&nbsp;', ' ').replace('&amp;', '&').replace('&lt;','<').replace('&gt;','>')
  s = re.sub(r'[ \t]+', ' ', s)
  s = re.sub(r'\n[ \t]+', '\n', s)
  s = re.sub(r'\n{2,}', '\n\n', s)
  return s.strip()

def parse_detail(html_str):
  m = re.search(r'<div class="title">\s*([一-鿿A-Za-z·\.]+?)\s*</div>', html_str)
  name = m.group(1) if m else ''
  m = re.search(r'<div class="content">(.*?)</div>\s*</div>\s*<div class="box-desc">', html_str, re.S)
  content = strip_html(m.group(1)) if m else ''
  m = re.search(r'<div class="box-desc">(.*?)</div>\s*<div class="bottom">', html_str, re.S)
  desc = strip_html(m.group(1)) if m else ''
  m = re.search(r'<div class="item-img">\s*<img[^>]*src="([^"]+)"', html_str)
  photo = m.group(1) if m else ''
  return {'name': name, 'content': content, 'desc': desc, 'photo': photo}

def parse_sections(text):
  # Extract: title line, 擅长, 履历, 专业能力, anything else
  out = {'title': '', 'specialty': '', 'resume': '', 'expertise': '', 'other': ''}
  # First non-empty line before any keyword = title (e.g. "北京宝秀兰医疗 OT督导")
  lines = [l.strip() for l in text.split('\n') if l.strip()]
  if not lines: return out
  out['title'] = lines[0]
  # Find keyworded sections in joined text
  joined = '\n'.join(lines[1:])
  for key, dst in [('擅长', 'specialty'), ('履历', 'resume'), ('专业能力', 'expertise')]:
    m = re.search(rf'{key}[：: ]*\s*\n?([^\n]+(?:\n(?!擅长|履历|专业能力|获奖|证书)[^\n]+)*)', joined)
    if m: out[dst] = m.group(1).strip()
  return out

teachers = []
for cid, code in CATEGORIES.items():
  body = http('https://www.baoxiulan.com/index/Index/szjs', {'cid': cid}).decode()
  data = json.loads(body)['data']
  for item in data:
    tid = item['id']
    try:
      detail_html = http(f"https://www.baoxiulan.com/index/Index/detail?id={tid}&title=%E5%B8%88%E8%B5%84%E4%BB%8B%E7%BB%8D&module=szjs").decode()
    except Exception as e:
      print(f"FAIL {tid}: {e}")
      continue
    parsed = parse_detail(detail_html)
    content_sec = parse_sections(parsed['content'])
    desc_sec = parse_sections(parsed['desc'])
    teacher = {
      'id': tid,
      'category': code,
      'categoryName': CAT_NAME[cid],
      'name': parsed['name'] or item['title'],
      'title': content_sec['title'] or item.get('desc','').strip(),
      'specialty': content_sec['specialty'],
      'resume': desc_sec['resume'] or content_sec['resume'],
      'expertise': desc_sec['expertise'] or content_sec['expertise'],
      'photoUrl': 'https://www.baoxiulan.com' + parsed['photo'] if parsed['photo'].startswith('/') else parsed['photo'],
    }
    teachers.append(teacher)
    print(f"OK {tid} {teacher['name']} {teacher['title'][:30]}")
    time.sleep(0.15)

with open('/tmp/therapists.json','w',encoding='utf-8') as f:
  json.dump(teachers, f, ensure_ascii=False, indent=2)
print(f"\nTOTAL: {len(teachers)}")
