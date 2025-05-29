import { languages } from '../../languages';

export default function Languages() {
  return (
    <section className="languages-container">
      {languages.map((language) => (
        <span
          key={language.name}
          className="language"
          style={{
            backgroundColor: language.backgroundColor,
            color: language.color,
          }}
        >
          {language.name}
        </span>
      ))}
    </section>
  );
}
