// ═══════════════════════════════════════════════════════
// SEED DATA — realistic demo data
// ═══════════════════════════════════════════════════════

let dsaProblems = [
  { id:1, title:'Two Sum', platform:'LeetCode', difficulty:'Easy', topic:'Array', status:'Solved', link:'https://leetcode.com/problems/two-sum/' },
  { id:2, title:'Longest Substring Without Repeating Characters', platform:'LeetCode', difficulty:'Medium', topic:'String', status:'Solved', link:'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
  { id:3, title:'Median of Two Sorted Arrays', platform:'LeetCode', difficulty:'Hard', topic:'Binary Search', status:'Revisit', link:'https://leetcode.com/problems/median-of-two-sorted-arrays/' },
  { id:4, title:'Valid Parentheses', platform:'LeetCode', difficulty:'Easy', topic:'Stack', status:'Solved', link:'https://leetcode.com/problems/valid-parentheses/' },
  { id:5, title:'Merge Two Sorted Lists', platform:'LeetCode', difficulty:'Easy', topic:'LinkedList', status:'Solved', link:'https://leetcode.com/problems/merge-two-sorted-lists/' },
  { id:6, title:'Maximum Subarray', platform:'LeetCode', difficulty:'Medium', topic:'DP', status:'Solved', link:'https://leetcode.com/problems/maximum-subarray/' },
  { id:7, title:'Climbing Stairs', platform:'LeetCode', difficulty:'Easy', topic:'DP', status:'Solved', link:'https://leetcode.com/problems/climbing-stairs/' },
  { id:8, title:'Binary Tree Inorder Traversal', platform:'LeetCode', difficulty:'Easy', topic:'Tree', status:'Solved', link:'https://leetcode.com/problems/binary-tree-inorder-traversal/' },
  { id:9, title:'Number of Islands', platform:'LeetCode', difficulty:'Medium', topic:'Graph', status:'Solved', link:'https://leetcode.com/problems/number-of-islands/' },
  { id:10, title:'Word Search', platform:'LeetCode', difficulty:'Medium', topic:'Backtracking', status:'Revisit', link:'https://leetcode.com/problems/word-search/' },
  { id:11, title:'Trapping Rain Water', platform:'LeetCode', difficulty:'Hard', topic:'Array', status:'Solved', link:'https://leetcode.com/problems/trapping-rain-water/' },
  { id:12, title:'Coin Change', platform:'LeetCode', difficulty:'Medium', topic:'DP', status:'Solved', link:'https://leetcode.com/problems/coin-change/' },
  { id:13, title:'Reverse Linked List', platform:'GeeksforGeeks', difficulty:'Easy', topic:'LinkedList', status:'Solved', link:'https://www.geeksforgeeks.org/reverse-a-linked-list/' },
  { id:14, title:'Detect Cycle in Graph', platform:'GeeksforGeeks', difficulty:'Medium', topic:'Graph', status:'Solved', link:'https://www.geeksforgeeks.org/detect-cycle-in-a-graph/' },
  { id:15, title:'N-Queens', platform:'LeetCode', difficulty:'Hard', topic:'Backtracking', status:'Revisit', link:'https://leetcode.com/problems/n-queens/' },
  { id:16, title:'Kth Largest Element', platform:'LeetCode', difficulty:'Medium', topic:'Heap', status:'Solved', link:'https://leetcode.com/problems/kth-largest-element-in-an-array/' },
  { id:17, title:'Jump Game', platform:'LeetCode', difficulty:'Medium', topic:'Greedy', status:'Solved', link:'https://leetcode.com/problems/jump-game/' },
  { id:18, title:'Binary Search', platform:'LeetCode', difficulty:'Easy', topic:'Binary Search', status:'Solved', link:'https://leetcode.com/problems/binary-search/' },
  { id:19, title:'Level Order Traversal', platform:'LeetCode', difficulty:'Medium', topic:'Tree', status:'Solved', link:'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
  { id:20, title:'Longest Common Subsequence', platform:'CodeChef', difficulty:'Medium', topic:'DP', status:'Revisit', link:'https://www.codechef.com/' },
];

let contests = [
  { id:1, name:'Codeforces Round 920 (Div. 3)', platform:'Codeforces', date:'2024-01-15', rank:2340, totalParticipants:18500, problemsSolved:4, ratingChange:+62, newRating:1162 },
  { id:2, name:'CodeChef Starters 120',          platform:'CodeChef',  date:'2024-02-07', rank:1820, totalParticipants:12400, problemsSolved:3, ratingChange:+38, newRating:1200 },
  { id:3, name:'Codeforces Round 930 (Div. 3)', platform:'Codeforces', date:'2024-02-28', rank:1950, totalParticipants:19200, problemsSolved:4, ratingChange:+55, newRating:1255 },
  { id:4, name:'LeetCode Weekly Contest 389',    platform:'LeetCode',  date:'2024-03-17', rank:3100, totalParticipants:26000, problemsSolved:3, ratingChange:+12, newRating:1267 },
  { id:5, name:'Codeforces Round 940 (Div. 3)', platform:'Codeforces', date:'2024-04-05', rank:1420, totalParticipants:20100, problemsSolved:5, ratingChange:+83, newRating:1350 },
  { id:6, name:'CodeChef Starters 135',          platform:'CodeChef',  date:'2024-04-24', rank:980,  totalParticipants:11800, problemsSolved:4, ratingChange:+47, newRating:1397 },
  { id:7, name:'LeetCode Biweekly Contest 130',  platform:'LeetCode',  date:'2024-05-11', rank:2200, totalParticipants:24500, problemsSolved:3, ratingChange:-8,  newRating:1389 },
  { id:8, name:'Codeforces Round 950 (Div. 3)', platform:'Codeforces', date:'2024-06-01', rank:870,  totalParticipants:21300, problemsSolved:5, ratingChange:+96, newRating:1485 },
];

let applications = [
  { id:1,  company:'Google',      role:'SDE Intern',        dateApplied:'2024-08-01', status:'Rejected', link:'' },
  { id:2,  company:'Microsoft',   role:'SWE Intern',        dateApplied:'2024-08-05', status:'Interview', link:'' },
  { id:3,  company:'Amazon',      role:'SDE Intern',        dateApplied:'2024-08-10', status:'OA', link:'' },
  { id:4,  company:'Flipkart',    role:'SDE Intern',        dateApplied:'2024-08-12', status:'Interview', link:'' },
  { id:5,  company:'Zomato',      role:'Backend Intern',    dateApplied:'2024-08-15', status:'Offer', link:'' },
  { id:6,  company:'Razorpay',    role:'SDE Intern',        dateApplied:'2024-08-18', status:'Applied', link:'' },
  { id:7,  company:'Atlassian',   role:'SWE Intern',        dateApplied:'2024-08-20', status:'Applied', link:'' },
  { id:8,  company:'Salesforce',  role:'SDE Intern',        dateApplied:'2024-08-22', status:'OA', link:'' },
  { id:9,  company:'PhonePe',     role:'Backend Intern',    dateApplied:'2024-08-25', status:'Offer', link:'' },
  { id:10, company:'Meesho',      role:'SDE Intern',        dateApplied:'2024-09-01', status:'Applied', link:'' },
];

let interviewNotes = [
  { id:1, company:'Microsoft',  round:'DSA',          date:'2024-09-05', outcome:'Cleared',  notes:'Asked 2 medium problems:\n1. Sliding Window Maximum (Hard) - could not solve optimally\n2. LRU Cache (Medium) - solved with HashMap + DLL\n\nInterviewer was friendly. Focused on time complexity explanation. Need to revise heap problems.' },
  { id:2, company:'Microsoft',  round:'Technical',    date:'2024-09-12', outcome:'Cleared',  notes:'CS fundamentals round:\n- OS: Deadlock conditions, virtual memory, paging\n- DBMS: Normalization up to 3NF, indexing, transactions (ACID)\n- OOPs: Polymorphism, design patterns (Singleton, Factory)\n\nTip: Revise OS scheduling algorithms well.' },
  { id:3, company:'Flipkart',   round:'DSA',          date:'2024-09-08', outcome:'Cleared',  notes:'Two DSA problems back-to-back:\n1. Find median from data stream - used two heaps approach\n2. Word Break II - DP + backtracking\n\nBoth solved. Interviewer asked about space complexity tradeoffs.' },
  { id:4, company:'Flipkart',   round:'Technical',    date:'2024-09-15', outcome:'Pending',  notes:'System Design: Design a URL Shortener\n- Discussed hashing strategies (MD5 vs Base62)\n- Database sharding, caching with Redis\n- Load balancing, rate limiting\n\nFelt okay but need to read more about consistent hashing.' },
  { id:5, company:'Zomato',     round:'DSA',          date:'2024-09-03', outcome:'Cleared',  notes:'Asked 1 problem: Clone a graph\n- Used BFS + HashMap\n- Solved in ~15 mins, explained approach clearly\n\nVery chill interview, focus on communication.' },
  { id:6, company:'Zomato',     round:'HR',           date:'2024-09-10', outcome:'Cleared',  notes:'Standard HR questions:\n- Why Zomato?\n- Tell me about a challenge you overcame\n- Where do you see yourself in 5 years?\n- Team conflict situation (STAR format)\n\nOffer received! Joining date TBD.' },
];

let nextId = 100;
