const createDropDownOptions = (dropdown, { name }) => {
  const option = document.createElement('option');
  option.value = name;
  option.textContent = name;
  dropdown.append(option);
};
