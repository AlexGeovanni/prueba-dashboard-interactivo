export default function Wrapper({ children,classname }: { children: React.ReactNode,classname?:string }) {
  return <div className={`max-w-[1280px] mx-auto ${classname}`} >{children}</div>
}