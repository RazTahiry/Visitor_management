import PropTypes from "prop-types";

export function MinMaxTotal({ min, max, total }) {
  return (
    <div className="flex justify-between items-center flex-wrap gap-4 text-gray-600 text-sm mx-auto lg:mx-0 mt-2 px-2">
      <p>
        Tarif minimal: <strong>{min}</strong> Ar
      </p>
      <p>
        Tarif maximal: <strong>{max}</strong> Ar
      </p>
      <p>
        Tarif total: <strong>{total}</strong> Ar
      </p>
    </div>
  );
}

MinMaxTotal.propTypes = {
  min: PropTypes.string.isRequired,
  max: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
};
