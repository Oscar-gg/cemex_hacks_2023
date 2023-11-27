# Smart Resource Manager
Aplicación web para monitorear gastos de energía, obtener rutas optimizadas y clasificar basura.
Projecto para CEMEX Hack 2023.
<br/>

# Features
### Monitorieo
Monitoreo de sensores en distintas oficinas. Con la opción de reservar en distintos horarios.


### Movilidad
Planeación de rutas usando algoritmos de optimización y desplegados mediante una API de Google Maps.

### Residuos
Demostración de clasificación de residuos e indicación de los lugares para depositarlo.

<br/>

# Tools
Built with:
- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [tRPC](https://trpc.io)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [tRPC](https://trpc.io)
- [AWS WebSocket API](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api.html)
  
Deployed with [Vercel](https://vercel.com/)
<br/>

# Structure
```bash
├─ prisma
│   └─ schema.prisma
│
├─ public
│
└─ src/app
    │
    ├─ (pages)
    │   ├─ dashboard
    │   ├─ monitoreo
    │   ├─ movilidad
    │   └─ residuos
    │
    ├─ components
    │
    ├─ api
    │   └─ routes
    │    
    └─ utils
        ├─ actions
        ├─ context
        ├─ hooks
        └─ libs
```

<br/>

# Development Team

| Name | Github |
| --- | --- | 
| Oscar Arreola | [@Oscar-gg](https://github.com/Oscar-gg) |
| Oscar Cárdenas | | 
| Jocelyn Velarde | | 
| Marian | | 
| Juan | | 
| Alejandra Coeto | [@Ale-Coeto](https://github.com/Ale-Coeto) | 

<br/>

# Check it out
https://cemex-hacks-2023.vercel.app/
