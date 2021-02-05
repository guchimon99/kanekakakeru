const Container = ({ children, ...props }) => (
  <div className="absolute top-12 left-0 right-0 bottom-0" {...props}>
    <div className="max-w-2xl mx-auto h-full flex flex-col">
      {children}
    </div>
  </div>
)

export default Container
