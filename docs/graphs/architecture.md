graph TD
N[Netlify]
G[Github]
S[Storyblok]
NC[Netlify CDN]
D[Developer]
E[Editor]
U[User]

E --> |edit content| S
D --> |push code| G 
G -->|code| N
S -->|content| N
N --> |build static site| NC
NC --> |serve static site| U
S --> |content| U
