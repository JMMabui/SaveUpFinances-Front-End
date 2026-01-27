import { Link, useLocation } from 'react-router-dom'

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function Breadcrumbs() {
  const location = useLocation()
  const parts = location.pathname.split('/').filter(Boolean)
  const paths = parts.map((_, i) => `/${parts.slice(0, i + 1).join('/')}`)

  return (
    <nav aria-label="Breadcrumb" className="text-sm mb-4">
      <ol className="flex items-center gap-2 flex-wrap">
        <li>
          <Link
            to="/dashboard"
            className="text-muted-foreground hover:underline"
          >
            Início
          </Link>
        </li>
        {parts.map((p, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span className="text-muted-foreground">/</span>
            {idx < parts.length - 1 ? (
              <Link
                to={paths[idx]}
                className="text-muted-foreground hover:underline"
              >
                {capitalize(p.replace('-', ' '))}
              </Link>
            ) : (
              <span className="text-foreground">
                {capitalize(p.replace('-', ' '))}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
