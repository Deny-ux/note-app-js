/*
takes notes array as argument and returns array with object, which
have information about active and archived tasks by that category
Example of return value:
[
 {category: 'Task', archived: 0, active: 3},
 {category: 'Random Thought', archived: 1, active: 1}, 
 {category: 'Idea', archived: 1, active: 1}
]
*/
export function getCountByCategory(notes) {
  const categories = new Set(notes.map(({ category }) => category));
  const sortedByCategoryNotes = [];
  categories.forEach((category) => {
    const activeAndArchivedObject = notes.reduce(
      (acc, curr) => {
        if (curr.category === category) {
          curr.isArchived
            ? (acc.archived = acc.archived + 1)
            : (acc.active = acc.active + 1);
        }
        return acc;
      },
      { archived: 0, active: 0 }
    );

    sortedByCategoryNotes.push({
      category,
      ...activeAndArchivedObject,
    });
  });
  return sortedByCategoryNotes;
}

export function getIconByCategory(icons, category) {
  for (const currCategory in icons) {
    if (currCategory === category) {
      return icons[category];
    }
  }
  throw new Error(`Cannot find icon with provided category: ${category}`);
}

export function sliceString(string) {
  if (string.length > 10) {
    return `${string.slice(0, 15)}...`;
  }
  return string;
}
