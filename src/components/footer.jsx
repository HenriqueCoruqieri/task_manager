const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-emerald-600 text-neutral-content items-center">
      <aside className="grid-flow-col items-center ml-2">
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a href="https://github.com/HenriqueCoruqieri/task_manager">
          <img
            alt="GitHub Icon"
            src="/git_icon.png"
            className=" w-[65px] h-[40px]"
          />
        </a>
      </nav>
    </footer>
  )
}

export default Footer
