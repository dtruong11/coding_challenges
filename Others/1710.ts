
class Solution {
  // 18:48 18:58
  // Box type 1: quantity 1 (each of size 3)
  // Truck size: 4
  // Add box 1:
  // Add box 2:
  // Add box 2:
  // Add box 3:
  // 4 boxes in total
  // Current load: 7 + 1 = 8
  // Add box type 1, size 3
  // 
  public int maximumUnits(int[][] boxTypes, int truckSize) {
      if (boxTypes == null || boxTypes.length == 0 || boxTypes[0].length != 2) {
          return 0;
      }
      
      // Convert to list of objects
      List<Box> boxes = convertToBoxes(boxTypes);
      
      // Max queue
      Queue<Box> pq = new PriorityQueue<Box>(boxTypes.length, (a, b) -> b.size - a.size);
      pq.addAll(boxes);
      
      int maxUnits = 0;
      int count = 0;
      while (count < truckSize && !pq.isEmpty()) {
          Box box = pq.poll();
          // System.out.println("Poll: size=" + box.size + " | cnt: " + box.count);
          // System.out.println("totalload + boxsize: " + (maxUnits + box.size));
          
          int remainingToAdd = truckSize - count; // 4
          int quantityToAdd = Math.min(remainingToAdd, box.count); // Min(4, 1) = 1
          maxUnits += quantityToAdd * box.size; // 1 * 3 = 3 => maxUnits = 3
          
          // maxUnits += box.size;
          count += quantityToAdd;// = 1
          
          
          box.count = box.count - quantityToAdd;
          // Edge case: 
          if (box.count > 0) {
              pq.add(box);    
          }
          
          // System.out.println("totalLoad:" + maxUnits);
      }
      
      return maxUnits;
  }
  
  private List<Box> convertToBoxes(int[][] boxTypes) {
      List<Box> boxes = new ArrayList<>();
      for (int i = 0 ; i < boxTypes.length; i++) {
          int[] boxType = boxTypes[i];
          Box box = new Box(i, boxType[1], boxType[0]);
          boxes.add(box);
      }
      
      return boxes;
  }
  
  // Rename to BoxType
  private class Box {
      int name;
      int size;
      int count;
      
      public Box(int name, int size, int count) {
          this.name = name;
          this.size = size;
          this.count = count;
      }
  }
}