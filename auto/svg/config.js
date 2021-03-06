const path = require('path')
const root = path.join(__dirname, '..', '..')

module.exports = {
  root,
  inputFolder: [root, 'src', 'plugins', 'icon', 'assets'],
  outputFolder: [root, 'src', 'plugins', 'icon', 'pattern'],
  svgRules: {
    allows: ['xmlns', 'xlink', 'viewBox'],
    attrs: {
      fill: 'currentColor',
    },
  },
  patternRules: [
    {
      name: 'path',
      allows: ['d', 'stroke-width', 'stroke'],
    },
    {
      name: 'circle',
      allows: ['cx', 'cy', 'r', 'x', 'y', 'stroke-width', 'stroke'],
    },
    {
      name: 'rect',
      allows: ['width', 'height', 'x', 'y', 'stroke-width', 'stroke'],
    },
    {
      name: 'ellipse',
      allows: ['cx', 'cy', 'rx', 'ry', 'stroke-width', 'stroke'],
    },
    {
      name: 'line',
      allows: ['x1', 'x2', 'y1', 'y2', 'stroke-width', 'stroke'],
    },
    {
      name: 'polygon',
      allows: ['points', 'stroke-width', 'stroke'],
    },
    {
      name: 'text',
      allows: ['x', 'y', 'font-family', 'font-size'],
    },
  ],
}
