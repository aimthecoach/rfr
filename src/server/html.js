export default (content, state, css, styled, cssHash, js) => `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>redux-first-router-boilerplate</title>
    ${css}
    ${styled}
  </head>
  <body>
    <script>window.__APOLLO_STATE__ = ${state}</script>
    <div id="root">${content}</div>
    ${cssHash}
    <script type='text/javascript' src='/static/vendor.js'></script>
    ${js}
  </body>
</html>`
