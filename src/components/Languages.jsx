import { languages } from '../../languages';
import clsx from 'clsx';

export default function Languages({ wrongGuessesCount }) {
  return (
    <section className="languages-container">
      {languages.map((language, index) => (
        <span
          key={language.name}
          className={clsx('language', index < wrongGuessesCount ? 'lost' : '')}
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
