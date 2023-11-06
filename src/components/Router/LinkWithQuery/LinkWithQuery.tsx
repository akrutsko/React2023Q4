import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  children: ReactNode;
  to: string;
};

export function LinkWithQuery({ children, to, ...props }: Props) {
  const { search } = useLocation();

  return (
    <Link to={to + search} {...props}>
      {children}
    </Link>
  );
}
