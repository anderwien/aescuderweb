import { ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';

type NavItem = {
  label: string;
  href: string;
  order: number;
  children?: NavItem[];
};

type Brand = {
  name: string;
  tagline: string;
  logo: string;
};

type Props = {
  brand: Brand;
  navItems: NavItem[];
  currentPath: string;
};

function isActive(href: string, currentPath: string) {
  const itemPath = href.replace(/\/$/, '') || '/';
  return itemPath === '/' ? currentPath === '/' : currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);
}

function hasActiveChild(item: NavItem, currentPath: string): boolean {
  return Boolean(item.children?.some((child) => isActive(child.href, currentPath) || hasActiveChild(child, currentPath)));
}

export default function HeaderNav({ brand, navItems, currentPath }: Props) {
  const [open, setOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);

  const toggleSubmenu = (href: string) => {
    setOpenSubmenus((items) => (items.includes(href) ? items.filter((item) => item !== href) : [...items, href]));
  };

  const closeMenu = () => {
    setOpen(false);
    setOpenSubmenus([]);
  };

  const renderNavItem = (item: NavItem, level = 0) => {
    const children = [...(item.children ?? [])].sort((a, b) => a.order - b.order);
    const active = isActive(item.href, currentPath) || hasActiveChild(item, currentPath);
    const hasChildren = children.length > 0;
    const submenuOpen = openSubmenus.includes(item.href);

    return (
      <div className={level > 0 ? 'nav__item nav__item--child' : 'nav__item'} key={item.href}>
        <div className="nav__row">
          <a href={item.href} aria-current={active ? 'page' : undefined} onClick={closeMenu}>
            {item.label}
          </a>
          {hasChildren && (
            <button
              className="submenu-toggle"
              type="button"
              aria-expanded={submenuOpen}
              aria-label={`Open ${item.label} submenu`}
              onClick={() => toggleSubmenu(item.href)}
            >
              <ChevronDown size={14} />
            </button>
          )}
        </div>
        {hasChildren && (
          <div className={submenuOpen ? 'submenu submenu--open' : 'submenu'}>
            {children.map((child) => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="site-header">
      <div className="site-header__inner wide-container">
        <a className="brand" href="/" aria-label={`${brand.name} home`} onClick={closeMenu}>
          <img src={brand.logo} alt="" width="48" height="48" />
          <span>
            <strong>{brand.name}</strong>
            <small>{brand.tagline}</small>
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
          <span>Menu</span>
        </button>

        <nav id="primary-navigation" className={open ? 'nav nav--open' : 'nav'} aria-label="Primary navigation">
          {navItems.map((item) => renderNavItem(item))}
        </nav>
      </div>
    </header>
  );
}
