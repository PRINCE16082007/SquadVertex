// logic.js - Contains logical reasoning functions (validation, neighbor checks)

const Logic = {
  
  validateGender: function(room, student) {
    // For Mixed rooms, allow any gender.
    if (room.type === "Mixed") return true;
    
    // For Boys room: allow only if student's gender is 'M' or 'male'
    if (room.type === "Boys") {
      if (student.gender === "M" || student.gender.toLowerCase() === "male") return true;
      alert("❌ Boys room: Only boys allowed!");
      return false;
    }
    
    // For Girls room: allow only if student's gender is 'F' or 'female'
    if (room.type === "Girls") {
      if (student.gender === "F" || student.gender.toLowerCase() === "female") return true;
      alert("❌ Girls room: Only girls allowed!");
      return false;
    }
    
    return true;
  },
  
  validateNeighbors: function(room, student, row, col) {
    if (room.neighborCheck === "none") return true;
    const directions = [];
    if (["horizontal", "both"].includes(room.neighborCheck)) {
      directions.push([0, -1], [0, 1]);
    }
    if (["vertical", "both"].includes(room.neighborCheck)) {
      directions.push([-1, 0], [1, 0]);
    }
    for (const [dx, dy] of directions) {
      const x = row + dx, y = col + dy;
      if (x >= 0 && x < room.rows && y >= 0 && y < room.cols) {
        const index = x * room.cols + y;
        if (room.seating[index]) {
          // Look up neighbor student (from global config)
          const neighbor = config.students.find(s => s.id === room.seating[index]);
          if (neighbor && neighbor.class === student.class) {
            alert("❌ Neighbor check: Same class students cannot sit adjacent!");
            return false;
          }
        }
      }
    }
    return true;
  }
  
  // Additional logical functions can be added here if needed.
};