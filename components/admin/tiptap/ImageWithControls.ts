import Image from '@tiptap/extension-image'

/**
 * Extends the base TipTap Image node with two extra attributes:
 *
 *   data-align: 'left' | 'center' | 'right'   (default 'center')
 *   data-size:  'small' | 'medium' | 'full'   (default 'medium')
 *
 * These attributes survive HTML round-trips so the public-facing article
 * renderer can read them and apply the same layout via CSS.
 */
export const ImageWithControls = Image.extend({
  name: 'image',
  inline: false,
  group: 'block',
  draggable: true,

  addAttributes() {
    return {
      ...this.parent?.(),
      align: {
        default: 'center',
        parseHTML: (el) => el.getAttribute('data-align') || 'center',
        renderHTML: (attrs) => ({ 'data-align': attrs.align }),
      },
      size: {
        default: 'medium',
        parseHTML: (el) => el.getAttribute('data-size') || 'medium',
        renderHTML: (attrs) => ({ 'data-size': attrs.size }),
      },
    }
  },
})
