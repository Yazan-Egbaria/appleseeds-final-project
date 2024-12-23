import { useState } from "react";

function AttributeContainer({ isEditing, onEdit, user, listKey, options }) {
  // Ensure user[listKey] is always an array
  const availableOptions = options.filter(
    (option) => !(user[listKey] || []).includes(option), // Fallback to empty array if undefined
  );

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleAddItem = (newItem) => {
    onEdit(listKey, [...(user[listKey] || []), newItem]); // Ensure user[listKey] is an array
    setDropdownVisible(false); // Close the dropdown after adding
  };

  const handleRemoveItem = (itemToRemove) => {
    onEdit(
      listKey,
      (user[listKey] || []).filter((item) => item !== itemToRemove), // Ensure user[listKey] is an array
    );
  };

  return (
    <div className="attribute-container">
      <div className="attribute-container-list">
        {/* Selected Items */}
        {(user[listKey] || []).map((item, index) => (
          <div key={index} className="attribute-container-item">
            <span>{item}</span>
            {isEditing && (
              <button
                className="remove-btn"
                onClick={() => handleRemoveItem(item)}
              >
                ✖
              </button>
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="add-attribute">
          <button
            className="add-attribute-btn"
            onClick={() => setDropdownVisible(!dropdownVisible)}
          >
            Add {listKey}
          </button>

          {dropdownVisible && (
            <select
              className="list-manager-dropdown"
              onChange={(e) => {
                handleAddItem(e.target.value);
                e.target.value = ""; // Reset dropdown
              }}
            >
              <option value="" disabled selected>
                Select an option
              </option>
              {availableOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
    </div>
  );
}

export default AttributeContainer;
