// function courseSchedule(numCourses, prerequisites) {
//   const queue = []
//   const indegree = createIndegree(prerequisites)
//   const adjList = createAdjList(prerequisites)
//   const visitedCourses = 0
//   for (let course in indegree) {
//     if (indegree[course] == 0) {
//       queue.push(course)
//     }
//   }
//   while (queue.length) {
//     const startCourse = queue.unshift()
//     visitedCourses++
//     const neighbors = adjList[startCourse]
//     for (let neighbor of neighbors) {
//       indegree[neighbor]--
//       if (indegree[neighbor] == 0) queue.push(neighbor)
//     }
//   }

//   if (visitedCourses !== numCourses) return false
//   return true 
// }

// function createAdjList(prereq) {
//   const adjList = {}
//   for (let coursePair of prereq) {
//     const first = coursePair[0]
//     const second = coursePair[1]
//     adjList[first] = adjList[first] || []
//     adjList[first].push(second)
//   }
//   return adjList
// }

// function createIndegree(prereq) {
//   const indegree = {}
//   console.log(prereq)
//   for (let i = 0; i < prereq.length; i++) {
//     const first = prereq[i][0]
//     const second = prereq[i][1]
//     indegree[first] = indegree[first]++ || 0
//     indegree[second] = indegree[second]++ || 1
//   }
//   return indegree
// }
// console.log(createIndegree([[1, 0], [0, 1]]))
// console.log(createAdjList([[1, 0], [0, 1]]))
// console.log(courseSchedule(2, [[1, 0], [0, 1]]))
// console.log(createIndegree([[1, 0]]))


var canFinish = function(numCourses, prerequisites) {
  let degrees = (new Array(numCourses)).fill(0);
  let queue = [];
  prerequisites.forEach(prerequisite => {
    degrees[prerequisite[0]]++;
  });
  
  degrees.forEach((degree, i) => {
    if (degree === 0) queue.push(i);
  });

  while (queue.length !== 0) {
    let finished = queue.shift();
    numCourses--;
    prerequisites.forEach(prerequisite => {
      if (prerequisite[1] === finished) {
        degrees[prerequisite[0]]--;
        if (degrees[prerequisite[0]] === 0) queue.push(prerequisite[0]);
      }
    });
  }
  
  return numCourses === 0;
}

console.log(canFinish(3, [1,0]))
