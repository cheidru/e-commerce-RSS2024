type Props = {
  classNameComponent?: string;
  classNameTitle?: string;
  classNameBody?: string;
  title: string;
  value?: string;
};

function TextField({
  classNameComponent,
  classNameTitle,
  classNameBody,
  title,
  value,
}: Props) {
  return (
    <div className={classNameComponent}>
      <div className={classNameTitle}>{title}</div>
      <div className={classNameBody}>{value}</div>
    </div>
  );
}

export default TextField;
