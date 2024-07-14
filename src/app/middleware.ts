// Without a defined matcher, this one line applies next-auth
// to the entire project.
export { default } from 'next-auth/middleware'

// Applies next-auth to matching routes - can be regex or string.
// This config can do many things, including setting up a custom callback.
// Refer the documentation for more information.
export const config = { matcher: ['/dashboard'] }
