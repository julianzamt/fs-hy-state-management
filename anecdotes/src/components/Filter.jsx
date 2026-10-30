import { useActions } from '../store';

const Filter = () => {
  const actions = useActions();

  const handleChange = (event) => {
    actions.setFilter(event.target.value.toLowerCase());
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} data-testid="filter" />
    </div>
  );
};

export default Filter;
