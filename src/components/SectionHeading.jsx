export default function SectionHeading({ id, title, lede }) {
  return (
    <header className="section__head">
      <h2 className="section__title" id={`${id}-title`}>
        {title}
      </h2>
      {lede ? <p className="section__lede">{lede}</p> : null}
    </header>
  );
}
