import useScrollToHash from '../hooks/useScrollToHash';

const ScrollToHashWrapper = ({ children }) => {
  useScrollToHash();
  return children;
};

export default ScrollToHashWrapper;
