function extractBodyContent(htmlString: string): string {
    // TODO: Implement this function
    const htmlStartTag = '<body>';
    const htmlEndTag = '</body>';

    const htmlStartIndex = htmlString.indexOf(htmlStartTag);
    const htmlEndIndex = htmlString.indexOf(htmlEndTag);

    return htmlString.slice(htmlStartIndex + htmlStartTag.length, htmlEndIndex);
};



// console.log(extractBodyContent(`<html>
//   <head>
//     <title>My Page</title>
//   </head>
//   <body>
//     <h1>Welcome!</h1>
//     <p>This is my new React app.</p>
//   </body>
// </html>`));

// console.log(extractBodyContent(`<!DOCTYPE html>
// <html>
//   <body>
//     <p>Hello world!</p>
//     <div>
//       <span>Nested content.</span>
//     </div>
//   </body>
// </html>`));

// console.log(extractBodyContent(`<html>
//   <body>
//     <h2>Test</h2>
//     <p>Another test.</p>
//   </body>
// </html>`));