/** @jsx jsx */
import { Link } from 'gatsby';
import normalizeUrl from 'normalize-url';
import { jsx, Styled } from 'theme-ui';

const noStyleLink = {
  display: 'block',
  textDecoration: 'none',
  color: 'inherit'
};

const ItemLink = ({ item, children, ...props }) => {
  // links
  if (item.frontmatter.link && item.fields.type === 'links') {
    const link = normalizeUrl(item.frontmatter.link);
    return (
      <a
        className="hover-on"
        rel="noopener noreferrer"
        target="_blank"
        href={link}
        sx={noStyleLink}
        {...props}
      >
        {children}
      </a>
    );
  }
  // notes
  if (item.fields.type === 'notes')
    return (
      <Link
        className="hover-on"
        to={item.fields.slug}
        sx={noStyleLink}
        {...props}
      >
        {children}
      </Link>
    );
  // posts / rest
  return (
    <Link
      className="hover-on"
      to={item.fields.slug}
      sx={noStyleLink}
      {...props}
    >
      {children}
    </Link>
  );
};

const titleForNoteSlice = (string, sliceTo = 40) => {
  string = string.replace(/\.\.\.$/, '');
  if (string.length > sliceTo) {
    string = string.slice(0, sliceTo);
    return `${string}...`;
  }
  return string;
};

const TitleForNote = ({ item }) => {
  if (item.frontmatter.title) return item.frontmatter.title;
  if (item.headings && item.headings.length > 0) {
    return item.headings[0].value;
  }
  if (item.frontmatter.description)
    return titleForNoteSlice(item.frontmatter.description);
  return titleForNoteSlice(item.excerpt);
};

const ItemTitle = ({ item, ...props }) => {
  const style = {
    fontSize: [1, 1],
    fontWeight: 'normal',
    mb: '0px',
    lineHeight: null
  };
  if (
    item.frontmatter.title &&
    item.frontmatter.link &&
    item.fields.type === 'links'
  ) {
    return (
      <Styled.h3 sx={style} {...props}>
        {`🔗 ${item.frontmatter.title}`}
      </Styled.h3>
    );
  }
  if (item.fields.type === 'notes') {
    return (
      <Styled.h3 sx={style} {...props}>
        <TitleForNote item={item} />
      </Styled.h3>
    );
  }
  return (
    <Styled.h3 sx={style} {...props}>{`${item.frontmatter.title}`}</Styled.h3>
  );
};

/**
 * @typedef {object} Props
 * @property {boolean=} isHovering
 * @property {object=} sxHover
 * @property {React.ReactNode=} children
 */

/**
 * @param {Props=} props
 */
const ItemHoveringStyle = ({
  isHovering = false,
  sxHover = { opacity: 0.7 },
  children
}) => {
  return isHovering ? (
    <div sx={{ ...sxHover }}>{children}</div>
  ) : (
    <div>{children}</div>
  );
};

const CompactComponents = { ItemLink, ItemTitle, ItemHoveringStyle };
export default CompactComponents;