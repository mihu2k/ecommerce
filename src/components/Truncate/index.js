export const Truncate = ({ tag, line, className, children }) => {
  const CustomTag = `${tag}`;
  const styles = {
    display: '-webkit-box',
    WebkitLineClamp: line,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordBreak: 'break-word',
  };

  return (
    <CustomTag style={styles} className={className}>
      {children}
    </CustomTag>
  );
};
