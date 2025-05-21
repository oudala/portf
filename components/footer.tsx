export function Footer() {
  return (
    <footer className="border-t border-black bg-[#f5f0e8] py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 border border-black"></div>
            <span className="text-sm font-medium uppercase">Oulad Dahman Ilyass</span>
          </div>
          <div className="text-sm text-black/70">© {new Date().getFullYear()} All rights reserved.</div>
          <div className="flex space-x-6">
            <a
              href="https://linkedin.com/in/ilyassod"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/oudala"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
