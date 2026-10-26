# Milestone 8: Module 45

## Deep Dive into MongoDB Operators and Queries

This module focuses on learning MongoDB query operators, filtering documents, updating data, sorting results, and performing basic data analysis using the Aggregation Pipeline.

### Topics Covered

- Introduction to MongoDB and NoSQL Booster setup
- Inserting fake data and running basic queries
- Comparison Operators
- Logical Operators
- Element and Type Operators
- Array Query Operators
- Update Operators
- Projection, Sorting, Limit, and Skip
- Basic Aggregation Pipeline

---

## 1. Basic Queries

```javascript
// Find all documents
db.jobs.find().toArray();

// Count all documents
db.jobs.countDocuments();

// Find one document
db.jobs.findOne();
```

## 2. Comparison Operators

Comparison operators help filter documents based on specific values.

| Operator | Meaning                  |
| -------- | ------------------------ |
| `$eq`    | Equal to                 |
| `$ne`    | Not equal to             |
| `$gt`    | Greater than             |
| `$gte`   | Greater than or equal to |
| `$lt`    | Less than                |
| `$lte`   | Less than or equal to    |

```javascript
// Find remote jobs
db.jobs.find({ isRemote: { $eq: true } }).toArray();

// Salary greater than 70,000
db.jobs.find({ salary: { $gt: 70000 } });

// Salary greater than or equal to 70,000
db.jobs.find({ salary: { $gte: 70000 } });

// Salary less than 70,000
db.jobs.find({ salary: { $lt: 70000 } });

// Salary less than or equal to 70,000
db.jobs.find({ salary: { $lte: 70000 } });

// Salary not equal to 70,000
db.jobs.find({ salary: { $ne: 70000 } });
```

## 3. Logical Operators

Logical operators combine multiple query conditions.

| Operator | Meaning                           |
| -------- | --------------------------------- |
| `$and`   | All conditions must match         |
| `$or`    | At least one condition must match |
| `$not`   | Negates a condition               |
| `$nor`   | None of the conditions must match |

```javascript
// Explicit AND
db.jobs.find({
  $and: [
    { location: "Dhaka" },
    { salary: { $gt: 70000 } }
  ]
});

// OR
db.jobs.find({
  $or: [
    { location: "Dhaka" },
    { location: "Chittagong" }
  ]
});

// NOT
db.jobs.find({
  salary: { $not: { $gt: 50000 } }
});

// NOR
db.jobs.find({
  $nor: [
    { location: "Dhaka" },
    { isRemote: true }
  ]
});

// Implicit AND
db.jobs.find({
  location: "Dhaka",
  salary: { $gt: 70000 }
});
```

## 4. Element and Type Operators

These operators check whether a field exists and what type of value it contains.

| Operator  | Meaning                       |
| --------- | ----------------------------- |
| `$exists` | Checks whether a field exists |
| `$type`   | Checks the BSON data type     |

```javascript
// Find documents where salary exists
db.jobs.find({
  salary: { $exists: true }
});

// Find documents where salary does not exist
db.jobs.find({
  salary: { $exists: false }
});

// Find documents where skills is an array
db.jobs.find({
  skills: { $type: "array" }
});

// Find documents where salary is numeric
db.jobs.find({
  salary: { $type: "number" }
});
```

Insert a document without a salary field to practice `$exists: false`.

```javascript
db.jobs.insertOne({
  title: "Unpaid Intern",
  company: "StartupXYZ",
  location: "Dhaka",
  experience: 0
});
```

## 5. Array Query Operators

Array operators help search documents containing arrays, such as a job's required skills.

| Operator     | Meaning                                            |
| ------------ | -------------------------------------------------- |
| `$in`        | Matches any specified value                        |
| `$nin`       | Matches none of the specified values               |
| `$all`       | Requires all specified values                      |
| `$size`      | Matches an exact array length                      |
| `$elemMatch` | Matches array elements against multiple conditions |

```javascript
// Match jobs containing any listed skill
db.jobs.find({
  skills: { $in: ["Python", "JavaScript", "SQL"] }
});

// Exclude jobs containing the listed skills
db.jobs.find({
  skills: { $nin: ["Python", "JavaScript"] }
});

// Match jobs containing both Python and SQL
db.jobs.find({
  skills: { $all: ["Python", "SQL"] }
});

// Find jobs requiring exactly three skills
db.jobs.find({
  skills: { $size: 3 }
});
```

### Practicing `$elemMatch`

```javascript
db.jobs.insertOne({
  title: "Senior Developer",
  company: "BigTech",
  interviews: [
    { round: 1, score: 85, passed: true },
    { round: 2, score: 70, passed: false }
  ]
});

db.jobs.find({
  interviews: {
    $elemMatch: {
      score: { $gt: 80 },
      passed: true
    }
  }
});
```

## 6. Update Operators

Update operators modify existing documents without replacing the entire document.

| Operator | Meaning                                  |
| -------- | ---------------------------------------- |
| `$set`   | Sets or adds a field                     |
| `$inc`   | Increments or decrements a numeric value |
| `$push`  | Adds an item to an array                 |
| `$pull`  | Removes matching items from an array     |

```javascript
// Update or add a field
db.jobs.updateOne(
  {
    title: "Cybersecurity Analyst",
    company: "SecureNet BD"
  },
  {
    $set: { isRemote: true }
  }
);

// Increase applicants by five
db.jobs.updateOne(
  {
    title: "Cybersecurity Analyst",
    company: "SecureNet BD"
  },
  {
    $inc: { applicants: 5 }
  }
);

// Add a skill
db.jobs.updateOne(
  {
    title: "Cybersecurity Analyst",
    company: "SecureNet BD"
  },
  {
    $push: { skills: "SQA" }
  }
);

// Remove a skill
db.jobs.updateOne(
  {
    title: "Cybersecurity Analyst",
    company: "SecureNet BD"
  },
  {
    $pull: { skills: "SQA" }
  }
);

// Verify updated documents
db.jobs.find().toArray();
```

## 7. Projection

Projection controls which fields appear in the query results.

```javascript
// Include selected fields
db.jobs.find(
  {},
  {
    title: 1,
    company: 1,
    salary: 1
  }
);

// Exclude the _id field
db.jobs.find(
  {},
  {
    title: 1,
    company: 1,
    salary: 1,
    _id: 0
  }
);

// Exclude specific fields
db.jobs.find(
  {},
  {
    _id: 0,
    applicants: 0
  }
);
```

**Note:** Inclusion and exclusion generally cannot be mixed in one projection, except for excluding `_id` from an inclusion projection.

## 8. Sorting

Sorting arranges query results in ascending or descending order.

```javascript
// Ascending order
db.jobs.find().sort({ salary: 1 });

// Descending order
db.jobs.find().sort({ salary: -1 });

// Sort by location, then salary
db.jobs.find().sort({
  location: 1,
  salary: -1
});
```

- `1` means ascending order.
- `-1` means descending order.

## 9. Limit and Skip

These methods control how many documents are returned and support pagination.

```javascript
// First five documents
db.jobs.find().limit(5);

// Skip the first five documents
db.jobs.find().skip(5);

// First page: 10 documents
db.jobs.find().skip(0).limit(10);

// Second page: next 10 documents
db.jobs.find().skip(10).limit(10);

// Active jobs, sorted by salary, with pagination
db.jobs.find(
  { status: "active" },
  { title: 1, company: 1, salary: 1, _id: 0 }
)
.sort({ salary: -1 })
.skip(5)
.limit(5);
```

## 10. Aggregation Pipeline Basics

The Aggregation Pipeline processes documents through multiple stages to filter, group, and analyze data.

### `$match`

Filters documents based on specified conditions.

```javascript
db.jobs.aggregate([
  {
    $match: {
      status: "active"
    }
  }
]);
```

### `$group`

Groups documents by a field and calculates aggregate values.

```javascript
// Count jobs and calculate average salary by location
db.jobs.aggregate([
  {
    $group: {
      _id: "$location",
      totalJobs: { $sum: 1 },
      avgSalary: { $avg: "$salary" }
    }
  }
]);
```

### Combining `$match` and `$group`

```javascript
db.jobs.aggregate([
  {
    $match: {
      status: "active"
    }
  },
  {
    $group: {
      _id: "$location",
      totalJobs: { $sum: 1 },
      avgSalary: { $avg: "$salary" }
    }
  }
]);
```

---

## Key Takeaways

- **Comparison operators:** Filter documents by value.
- **Logical operators:** Combine multiple conditions.
- **Element and type operators:** Check field existence and data types.
- **Array operators:** Query documents containing arrays.
- **Update operators:** Modify document fields and arrays.
- **Projection:** Select which fields to return.
- **Sorting:** Arrange results in a specific order.
- **Limit and skip:** Implement pagination.
- **Aggregation Pipeline:** Filter and analyze data across multiple stages.

## Practice Checklist

- [x] Run basic queries and count documents.
- [X] Practice comparison and logical operators.
- [x] Check field existence and BSON types.
- [x] Query arrays using `$in`, `$nin`, `$all`, and `$size`.
- [x] Practice `$set`, `$inc`, `$push`, and `$pull`.
- [x] Use projection, sorting, limit, and skip.
- [x] Group jobs by location and calculate average salary.

**Module 45 completed:** Practiced MongoDB operators, queries, updates, pagination, and basic aggregation using a sample job collection.
