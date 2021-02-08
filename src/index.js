/**
 * @usage:
 * Active:
 * Transforms.setNodes(editor, { type:'list-item' })
 * Transforms.wrapNodes(editor, { type: 'bulleted-list', children: [] })
 *
 * https://github.com/GitbookIO/slate-edit-list
 * https://gitbookio.github.io/slate-edit-list/
 *
 * indent: 缩进一个单位
 Transforms.wrapNodes(editor, { type: 'bulleted-list', children: [] })
 Transforms.setNodes(editor, { type:'list-item' })

 * dedent: 反向缩进一个单位
 Transforms.unwrapNodes(editor, {
    match: n => n.type === 'bulleted-list' || n.type === 'numbered-list' ,
    split: true,
  })
 */

import React from 'react';
import { jsx } from 'slate-hyperscript';
import { ReactEditor } from 'slate-react';
import NxSlatePlugin from '@jswork/next-slate-plugin';


export default NxSlatePlugin.define({
  id: 'bulleted-list',
  serialize: {
    input: ({ el }, children) => {
      const nodeName = el.nodeName.toLowerCase();
      if (nodeName === 'ul') {
        return jsx('element', { type: 'bulleted-list' }, children);
      }
    },
    output: (node, children) => {
      return `<ul>${children}</ul>`;
    }
  },
  render: (inContext, { attributes, children, element }) => {
    const path = ReactEditor.findPath(inContext.editor, element);
    return (
      <ul data-depth={path.length} {...attributes}>
        {children}
      </ul>
    );
  }
});
