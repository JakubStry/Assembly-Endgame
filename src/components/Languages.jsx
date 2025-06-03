import { languages } from '../../languages';
import clsx from 'clsx';

export default function Languages({ wrongGuessCount }) {
  const languageElements = languages.map((language, index) => {
    const isLanguageLost = index < wrongGuessCount;
    const styles = {
      backgroundColor: language.backgroundColor,
      color: language.color,
    };

    const className = clsx('langauge', isLanguageLost && 'lost');
    return (
      <span className={className} style={styles} key={language.name}></span>
    );
  });

  return <section className="languages-container">{languageElements}</section>;
}
