export interface CategoryProps {
  name: string;
  id: string;
}

export function Category({ name, id }: CategoryProps) {
  return (
    <div className="category" data-id={id}>
      {name}
    </div>
  );
}
