import { useMemo, useState } from "react";
import cartesian from "cartesian";

function App() {
  const [attributes, setAttributes] = useState({});

  function addAttribute(e) {
    e.preventDefault();
    const form = e.target;
    const attribute = new FormData(form).get("attribute");

    if (attribute) {
      setAttributes((s) => ({ ...s, [attribute]: [] }));
      form.reset();
    }
  }

  function addOption(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const attribute = formData.get("attribute");
    const option = formData.get("option");
    if (option) {
      setAttributes((s) => ({ ...s, [attribute]: [...s[attribute], option] }));
      form.reset();
    }
  }

  const products = useMemo(() => {
    const value = Object.entries(attributes)
      .map(([attribute, options]) =>
        options.map((option) => ({ attribute, option }))
      )
      .filter((el) => el.length);

    return cartesian(value);
  }, [attributes]);

  return (
    <>
      <form onSubmit={addAttribute}>
        <input type="text" name="attribute" />
        <button>Add Attribute</button>
      </form>
      <hr />

      <div>
        {Object.entries(attributes).map(([attribute, options]) => (
          <div key={attribute}>
            <h3>{attribute}</h3>
            <form onSubmit={addOption}>
              <input name="option" type="text" />
              <input name="attribute" type="hidden" value={attribute} />
              <button>Add Option</button>
            </form>
            <ul>
              {options.map((option) => (
                <li key={option}>{option}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div>
        <h2>Products</h2>
        <ol>
          {products.map((product, i) => (
            <li key={i}>
              <ul>
                {product.map((el, i) => (
                  <li key={i}>
                    {el.attribute} : {el.option}
                  </li>
                ))}
              </ul>
              <hr />
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default App;
