/**
 * @typedef Props
 * @property {import('solid-js').Accessor<number>} cx
 * @property {import('solid-js').Accessor<number>} cy
 *
 *
 * @param {Props} param0
 * @returns
 */
export default function Handle({ cx }) {
  return <circle cx={cx()}></circle>;
}
