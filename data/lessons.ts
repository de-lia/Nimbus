import { Lesson } from "../types/lesson";

export const lessons: Lesson[] = [
  // ============================================
  // S3 MODULE 1: FUNDAMENTALS (10 lessons)
  // ============================================
  {
    lessonId: "s3_lesson_1",
    title: "What is Amazon S3?",
    service: "s3",
    roles: ["cloud_practitioner", "solutions_architect", "developer"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    content: [
      {
        type: "text",
        text: "Imagine you have a magic backpack. This backpack is special because it can hold anything you want — photos, videos, documents, you name it. And the best part? It never runs out of space. You can put as much as you want in it, and it will always have room for more. In the world of AWS, this magic backpack is called an S3 Bucket.",
      },
      {
        type: "text",
        text: "S3 stands for Simple Storage Service, and it's a place where you can store and retrieve any amount of data, anytime, from anywhere on the web. It's like having your own personal, infinitely large hard drive in the cloud.",
      },
      {
        type: "quiz",
        question: "What does S3 stand for?",
        options: ["Simple Storage Service", "Secure Storage System", "Standard Storage Service", "Simple Server Storage"],
        correctAnswer: "Simple Storage Service",
      },
    ],
  },
  {
    lessonId: "s3_lesson_2",
    title: "Understanding S3 Buckets",
    service: "s3",
    roles: ["cloud_practitioner", "solutions_architect", "developer"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_1"],
    content: [
      {
        type: "text",
        text: "A bucket is a container for objects stored in Amazon S3. Think of it like a top-level folder. Every object is contained in a bucket. For example, if you store a photo named 'vacation.jpg' in a bucket named 'my-photos', the object can be addressed as 'my-photos/vacation.jpg'.",
      },
      {
        type: "quiz",
        question: "What is an S3 bucket?",
        options: ["A container for objects", "A type of database", "A virtual machine", "A network router"],
        correctAnswer: "A container for objects",
      },
      {
        type: "text",
        text: "Bucket names must be globally unique across all AWS accounts. Once you create a bucket with a specific name, no one else can use that name until you delete the bucket.",
      },
    ],
  },
  {
    lessonId: "s3_lesson_3",
    title: "S3 Objects Explained",
    service: "s3",
    roles: ["cloud_practitioner", "solutions_architect", "developer"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_2"],
    content: [
      {
        type: "text",
        text: "Objects are the fundamental entities stored in S3. An object consists of data (the file itself), metadata (information about the file), and a unique identifier (the key). You can store virtually any type of file as an object.",
      },
      {
        type: "quiz",
        question: "What are the three components of an S3 object?",
        options: ["Data, metadata, and key", "Name, size, and date", "Bucket, folder, and file", "Owner, permissions, and content"],
        correctAnswer: "Data, metadata, and key",
      },
    ],
  },
  {
    lessonId: "s3_lesson_4",
    title: "S3 Object Keys and Naming",
    service: "s3",
    roles: ["cloud_practitioner", "solutions_architect", "developer"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_3"],
    content: [
      {
        type: "text",
        text: "The object key is the unique identifier for an object within a bucket. It's essentially the full path to your file. For example: 'photos/2024/vacation.jpg'. While S3 doesn't have a true folder structure, you can use forward slashes in keys to organize objects logically.",
      },
      {
        type: "quiz",
        question: "Can S3 object keys contain forward slashes?",
        options: ["Yes, to simulate folders", "No, they're not allowed", "Only in bucket names", "Only for images"],
        correctAnswer: "Yes, to simulate folders",
      },
    ],
  },
  {
    lessonId: "s3_lesson_5",
    title: "S3 Storage Classes Overview",
    service: "s3",
    roles: ["cloud_practitioner", "solutions_architect", "developer"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_3"],
    content: [
      {
        type: "text",
        text: "S3 offers different storage classes designed for different use cases. Think of them like different types of storage units - some are for things you need frequently (Standard), others for things you rarely access (Glacier). Each class has different costs and retrieval times.",
      },
      {
        type: "quiz",
        question: "Why does S3 offer multiple storage classes?",
        options: ["To optimize cost based on access patterns", "To increase storage speed", "To improve security", "To support more file types"],
        correctAnswer: "To optimize cost based on access patterns",
      },
    ],
  },
  {
    lessonId: "s3_lesson_6",
    title: "S3 Standard Storage Class",
    service: "s3",
    roles: ["cloud_practitioner", "solutions_architect", "developer"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_5"],
    content: [
      {
        type: "text",
        text: "S3 Standard is the default storage class. It's designed for frequently accessed data and offers high durability, availability, and performance. Use it for active data like website content, mobile apps, gaming applications, and big data analytics.",
      },
      {
        type: "quiz",
        question: "When should you use S3 Standard?",
        options: ["For frequently accessed data", "For archived data", "For backup only", "For temporary files"],
        correctAnswer: "For frequently accessed data",
      },
    ],
  },
  {
    lessonId: "s3_lesson_7",
    title: "S3 Durability and Availability",
    service: "s3",
    roles: ["cloud_practitioner", "solutions_architect", "developer"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_6"],
    content: [
      {
        type: "text",
        text: "S3 provides 99.999999999% (11 nines) durability. This means if you store 10 million objects, you can expect to lose one object every 10,000 years on average. S3 achieves this by automatically storing your data across multiple devices in multiple facilities.",
      },
      {
        type: "quiz",
        question: "How many nines of durability does S3 provide?",
        options: ["11 nines (99.999999999%)", "9 nines", "5 nines", "3 nines"],
        correctAnswer: "11 nines (99.999999999%)",
      },
    ],
  },
  {
    lessonId: "s3_lesson_8",
    title: "S3 Regions and Data Residency",
    service: "s3",
    roles: ["cloud_practitioner", "solutions_architect", "developer"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_2"],
    content: [
      {
        type: "text",
        text: "When you create an S3 bucket, you choose a specific AWS Region. Your data stays in that region unless you explicitly transfer it. This is important for compliance, latency, and cost optimization. Choose a region close to your users for better performance.",
      },
      {
        type: "quiz",
        question: "Does S3 data automatically replicate across all regions?",
        options: ["No, data stays in the chosen region", "Yes, for redundancy", "Only for Standard class", "Only if you enable it"],
        correctAnswer: "No, data stays in the chosen region",
      },
    ],
  },
  {
    lessonId: "s3_lesson_9",
    title: "S3 Bucket Naming Rules",
    service: "s3",
    roles: ["cloud_practitioner", "solutions_architect", "developer"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_2"],
    content: [
      {
        type: "text",
        text: "S3 bucket names must be between 3-63 characters, contain only lowercase letters, numbers, hyphens, and periods. They must start with a letter or number, and be globally unique. Think carefully about naming - you can't rename a bucket once it's created!",
      },
      {
        type: "quiz",
        question: "Can S3 bucket names contain uppercase letters?",
        options: ["No, only lowercase", "Yes, any case", "Only the first letter", "Only for private buckets"],
        correctAnswer: "No, only lowercase",
      },
    ],
  },
  {
    lessonId: "s3_lesson_10",
    title: "S3 Use Cases",
    service: "s3",
    roles: ["cloud_practitioner", "solutions_architect", "developer"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_1"],
    content: [
      {
        type: "text",
        text: "S3 is incredibly versatile. Common use cases include: backup and restore, disaster recovery, archiving, data lakes for big data analytics, static website hosting, content distribution, and storing application data. Many companies use S3 as the foundation of their cloud infrastructure.",
      },
      {
        type: "quiz",
        question: "Which is NOT a common S3 use case?",
        options: ["Running databases", "Backup and restore", "Static website hosting", "Data archiving"],
        correctAnswer: "Running databases",
      },
    ],
  },

  // ============================================
  // S3 MODULE 2: SECURITY & PERMISSIONS (15 lessons)
  // ============================================
  {
    lessonId: "s3_lesson_11",
    title: "S3 Security Overview",
    service: "s3",
    roles: ["solutions_architect", "sysops_administrator", "developer"],
    durationSeconds: 180,
    difficulty: "medium",
    xpReward: 75,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_1"],
    content: [
      {
        type: "text",
        text: "Security is paramount in S3. By default, all S3 buckets and objects are private. Only the bucket owner can access them. AWS provides multiple layers of security: IAM policies, bucket policies, Access Control Lists (ACLs), and encryption.",
      },
      {
        type: "quiz",
        question: "By default, are S3 buckets public or private?",
        options: ["Private", "Public", "It depends on the region", "It depends on the storage class"],
        correctAnswer: "Private",
      },
    ],
  },
  {
    lessonId: "s3_lesson_12",
    title: "S3 Bucket Policies",
    service: "s3",
    roles: ["solutions_architect", "sysops_administrator"],
    durationSeconds: 180,
    difficulty: "medium",
    xpReward: 75,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_11"],
    content: [
      {
        type: "text",
        text: "Bucket policies are JSON-based access policy documents that define who can access your bucket and what actions they can perform. They're attached directly to buckets and can grant permissions to users from other AWS accounts or even anonymous users (for public content).",
      },
      {
        type: "quiz",
        question: "What format are bucket policies written in?",
        options: ["JSON", "XML", "YAML", "Plain text"],
        correctAnswer: "JSON",
      },
    ],
  },
  {
    lessonId: "s3_lesson_13",
    title: "IAM Policies for S3",
    service: "s3",
    roles: ["solutions_architect", "sysops_administrator"],
    durationSeconds: 180,
    difficulty: "medium",
    xpReward: 75,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_11"],
    content: [
      {
        type: "text",
        text: "IAM policies control what AWS users and roles can do with S3. Unlike bucket policies (which are attached to buckets), IAM policies are attached to users, groups, or roles. Use IAM policies to manage permissions for your AWS users and applications.",
      },
      {
        type: "quiz",
        question: "Where are IAM policies attached?",
        options: ["Users, groups, or roles", "Buckets", "Objects", "Regions"],
        correctAnswer: "Users, groups, or roles",
      },
    ],
  },
  {
    lessonId: "s3_lesson_14",
    title: "S3 Block Public Access",
    service: "s3",
    roles: ["solutions_architect", "sysops_administrator"],
    durationSeconds: 180,
    difficulty: "medium",
    xpReward: 75,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_11"],
    content: [
      {
        type: "text",
        text: "Block Public Access is a security feature that provides an additional layer of protection. It can override other policies to prevent public access to your buckets and objects. This helps prevent accidental data exposure - a common security mistake.",
      },
      {
        type: "quiz",
        question: "What does Block Public Access prevent?",
        options: ["Accidental public exposure", "All access", "IAM access", "Encryption"],
        correctAnswer: "Accidental public exposure",
      },
    ],
  },
  {
    lessonId: "s3_lesson_15",
    title: "S3 Encryption at Rest",
    service: "s3",
    roles: ["solutions_architect", "sysops_administrator", "developer"],
    durationSeconds: 180,
    difficulty: "medium",
    xpReward: 75,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_11"],
    content: [
      {
        type: "text",
        text: "Encryption at rest protects your data while it's stored in S3. S3 offers server-side encryption (SSE) where AWS encrypts your data as it writes it to disk and decrypts it when you access it. This happens automatically and transparently.",
      },
      {
        type: "quiz",
        question: "What is encryption at rest?",
        options: ["Encrypting stored data", "Encrypting data in transit", "Encrypting backups only", "Encrypting metadata"],
        correctAnswer: "Encrypting stored data",
      },
    ],
  },
  {
    lessonId: "s3_lesson_16",
    title: "S3 Server-Side Encryption Options",
    service: "s3",
    roles: ["solutions_architect", "sysops_administrator"],
    durationSeconds: 180,
    difficulty: "medium",
    xpReward: 75,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_15"],
    content: [
      {
        type: "text",
        text: "S3 offers three server-side encryption options: SSE-S3 (S3-managed keys), SSE-KMS (AWS KMS-managed keys), and SSE-C (customer-provided keys). SSE-S3 is the simplest and most common. SSE-KMS provides additional control and audit trails.",
      },
      {
        type: "quiz",
        question: "Which SSE option uses S3-managed keys?",
        options: ["SSE-S3", "SSE-KMS", "SSE-C", "SSE-IAM"],
        correctAnswer: "SSE-S3",
      },
    ],
  },
  {
    lessonId: "s3_lesson_17",
    title: "S3 Encryption in Transit",
    service: "s3",
    roles: ["solutions_architect", "sysops_administrator", "developer"],
    durationSeconds: 180,
    difficulty: "medium",
    xpReward: 75,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_15"],
    content: [
      {
        type: "text",
        text: "Encryption in transit protects your data while it's moving between your application and S3. S3 supports HTTPS (SSL/TLS) for all requests. You can enforce HTTPS-only access using bucket policies to ensure data is always encrypted during transmission.",
      },
      {
        type: "quiz",
        question: "What protocol does S3 use for encryption in transit?",
        options: ["HTTPS/SSL/TLS", "FTP", "SSH", "HTTP"],
        correctAnswer: "HTTPS/SSL/TLS",
      },
    ],
  },
  {
    lessonId: "s3_lesson_18",
    title: "S3 Bucket Versioning",
    service: "s3",
    roles: ["solutions_architect", "sysops_administrator"],
    durationSeconds: 180,
    difficulty: "medium",
    xpReward: 75,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_11"],
    content: [
      {
        type: "text",
        text: "Versioning keeps multiple versions of an object. If someone accidentally deletes or overwrites an object, you can restore a previous version. Once enabled, versioning can't be disabled (only suspended), so plan carefully.",
      },
      {
        type: "quiz",
        question: "Can you disable versioning once it's enabled?",
        options: ["No, only suspend it", "Yes, anytime", "Only after 30 days", "Only if bucket is empty"],
        correctAnswer: "No, only suspend it",
      },
    ],
  },
  {
    lessonId: "s3_lesson_19",
    title: "S3 MFA Delete",
    service: "s3",
    roles: ["solutions_architect", "sysops_administrator"],
    durationSeconds: 180,
    difficulty: "medium",
    xpReward: 75,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_18"],
    content: [
      {
        type: "text",
        text: "MFA Delete adds an extra layer of security by requiring multi-factor authentication to permanently delete object versions or change versioning state. This prevents accidental or malicious deletions.",
      },
      {
        type: "quiz",
        question: "What does MFA Delete require?",
        options: ["Multi-factor authentication", "Multiple users", "Manager approval", "Backup first"],
        correctAnswer: "Multi-factor authentication",
      },
    ],
  },
  {
    lessonId: "s3_lesson_20",
    title: "S3 Access Logging",
    service: "s3",
    roles: ["solutions_architect", "sysops_administrator"],
    durationSeconds: 180,
    difficulty: "medium",
    xpReward: 75,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_11"],
    content: [
      {
        type: "text",
        text: "Server access logging provides detailed records of requests made to your bucket. Logs include information like requester, bucket name, request time, action, and response status. This is crucial for security audits and compliance.",
      },
      {
        type: "quiz",
        question: "What information do S3 access logs contain?",
        options: ["Request details and response status", "Only error messages", "Only successful requests", "User passwords"],
        correctAnswer: "Request details and response status",
      },
    ],
  },
  {
    lessonId: "s3_lesson_21",
    title: "S3 Object Lock",
    service: "s3",
    roles: ["solutions_architect", "sysops_administrator"],
    durationSeconds: 180,
    difficulty: "medium",
    xpReward: 75,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_18"],
    content: [
      {
        type: "text",
        text: "Object Lock prevents objects from being deleted or overwritten for a fixed amount of time or indefinitely. It's designed for regulatory compliance that requires write-once-read-many (WORM) storage. Once locked, even the root account can't delete the object.",
      },
      {
        type: "quiz",
        question: "What does WORM stand for?",
        options: ["Write-Once-Read-Many", "Write-Only-Read-Maybe", "Write-Over-Read-More", "Write-Once-Remove-Many"],
        correctAnswer: "Write-Once-Read-Many",
      },
    ],
  },
  {
    lessonId: "s3_lesson_22",
    title: "S3 Pre-Signed URLs",
    service: "s3",
    roles: ["solutions_architect", "developer"],
    durationSeconds: 180,
    difficulty: "medium",
    xpReward: 75,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_11"],
    content: [
      {
        type: "text",
        text: "Pre-signed URLs grant temporary access to private S3 objects. You generate a URL with an expiration time, and anyone with that URL can access the object until it expires. This is perfect for sharing private files or allowing uploads without giving permanent access.",
      },
      {
        type: "quiz",
        question: "What do pre-signed URLs provide?",
        options: ["Temporary access to private objects", "Permanent public access", "Faster downloads", "Free storage"],
        correctAnswer: "Temporary access to private objects",
      },
    ],
  },
  {
    lessonId: "s3_lesson_23",
    title: "S3 Access Points",
    service: "s3",
    roles: ["solutions_architect", "sysops_administrator"],
    durationSeconds: 180,
    difficulty: "medium",
    xpReward: 75,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_12"],
    content: [
      {
        type: "text",
        text: "Access Points simplify managing data access at scale. Instead of one complex bucket policy, you can create multiple access points, each with its own policy. For example, create separate access points for analytics, finance, and marketing teams accessing the same bucket.",
      },
      {
        type: "quiz",
        question: "What do Access Points simplify?",
        options: ["Managing data access at scale", "Uploading files", "Downloading files", "Bucket creation"],
        correctAnswer: "Managing data access at scale",
      },
    ],
  },
  {
    lessonId: "s3_lesson_24",
    title: "S3 Security Best Practices",
    service: "s3",
    roles: ["solutions_architect", "sysops_administrator"],
    durationSeconds: 180,
    difficulty: "medium",
    xpReward: 75,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_11", "s3_lesson_14", "s3_lesson_15"],
    content: [
      {
        type: "text",
        text: "Follow these S3 security best practices: Enable Block Public Access by default, use IAM roles instead of access keys, enable encryption at rest and in transit, enable versioning for important data, use MFA Delete for critical buckets, enable access logging, and regularly audit permissions.",
      },
      {
        type: "quiz",
        question: "Which is a security best practice?",
        options: ["Enable Block Public Access", "Make all buckets public", "Disable encryption", "Share access keys"],
        correctAnswer: "Enable Block Public Access",
      },
    ],
  },
  {
    lessonId: "s3_lesson_25",
    title: "S3 Compliance and Governance",
    service: "s3",
    roles: ["solutions_architect", "sysops_administrator"],
    durationSeconds: 180,
    difficulty: "medium",
    xpReward: 75,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_11"],
    content: [
      {
        type: "text",
        text: "S3 supports various compliance programs including HIPAA, PCI-DSS, and GDPR. Use features like Object Lock for regulatory requirements, encryption for data protection, and access logging for audit trails. AWS provides compliance reports and certifications.",
      },
      {
        type: "quiz",
        question: "Which feature helps with regulatory compliance?",
        options: ["Object Lock", "Faster uploads", "Cheaper storage", "More regions"],
        correctAnswer: "Object Lock",
      },
    ],
  },

  // ============================================
  // S3 MODULE 3: STORAGE CLASSES (10 lessons)
  // ============================================
  {
    lessonId: "s3_lesson_26",
    title: "S3 Intelligent-Tiering",
    service: "s3",
    roles: ["cloud_practitioner", "solutions_architect", "developer"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_5"],
    content: [
      {
        type: "text",
        text: "S3 Intelligent-Tiering automatically moves objects between access tiers based on usage patterns. If an object isn't accessed for 30 days, it moves to a lower-cost tier. When accessed again, it moves back to the frequent access tier. Perfect when access patterns are unpredictable.",
      },
      {
        type: "quiz",
        question: "What does Intelligent-Tiering do automatically?",
        options: ["Moves objects between tiers based on access", "Deletes old objects", "Encrypts data", "Backs up data"],
        correctAnswer: "Moves objects between tiers based on access",
      },
    ],
  },
  {
    lessonId: "s3_lesson_27",
    title: "S3 Standard-IA (Infrequent Access)",
    service: "s3",
    roles: ["cloud_practitioner", "solutions_architect", "developer"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_5"],
    content: [
      {
        type: "text",
        text: "S3 Standard-IA is for data accessed less frequently but requires rapid access when needed. It costs less than Standard but charges a retrieval fee. Ideal for backups, disaster recovery files, and long-term storage where you need immediate access but don't access often.",
      },
      {
        type: "quiz",
        question: "When should you use Standard-IA?",
        options: ["Infrequently accessed data needing rapid access", "Frequently accessed data", "Archived data", "Temporary files"],
        correctAnswer: "Infrequently accessed data needing rapid access",
      },
    ],
  },
  {
    lessonId: "s3_lesson_28",
    title: "S3 One Zone-IA",
    service: "s3",
    roles: ["cloud_practitioner", "solutions_architect", "developer"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_27"],
    content: [
      {
        type: "text",
        text: "One Zone-IA stores data in a single Availability Zone instead of multiple zones. It costs 20% less than Standard-IA but doesn't protect against AZ loss. Use it for secondary backup copies or data you can easily recreate, like image thumbnails.",
      },
      {
        type: "quiz",
        question: "How many Availability Zones does One Zone-IA use?",
        options: ["One", "Two", "Three", "All available zones"],
        correctAnswer: "One",
      },
    ],
  },
  {
    lessonId: "s3_lesson_29",
    title: "S3 Glacier Instant Retrieval",
    service: "s3",
    roles: ["cloud_practitioner", "solutions_architect", "developer"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_5"],
    content: [
      {
        type: "text",
        text: "Glacier Instant Retrieval is for archive data that needs immediate access. It's the lowest-cost storage for data accessed once per quarter. Perfect for medical images, news media assets, or user-generated content archives that must be instantly available when needed.",
      },
      {
        type: "quiz",
        question: "How quickly can you retrieve data from Glacier Instant Retrieval?",
        options: ["Milliseconds", "Minutes", "Hours", "Days"],
        correctAnswer: "Milliseconds",
      },
    ],
  },
  {
    lessonId: "s3_lesson_30",
    title: "S3 Glacier Flexible Retrieval",
    service: "s3",
    roles: ["cloud_practitioner", "solutions_architect", "developer"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_29"],
    content: [
      {
        type: "text",
        text: "Glacier Flexible Retrieval (formerly Glacier) is for archive data accessed 1-2 times per year. Retrieval takes minutes to hours depending on the option you choose: Expedited (1-5 minutes), Standard (3-5 hours), or Bulk (5-12 hours). Great for compliance archives.",
      },
      {
        type: "quiz",
        question: "What's the fastest retrieval option for Glacier Flexible Retrieval?",
        options: ["Expedited (1-5 minutes)", "Instant", "Standard (3-5 hours)", "Bulk (5-12 hours)"],
        correctAnswer: "Expedited (1-5 minutes)",
      },
    ],
  },
  {
    lessonId: "s3_lesson_31",
    title: "S3 Glacier Deep Archive",
    service: "s3",
    roles: ["cloud_practitioner", "solutions_architect", "developer"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_30"],
    content: [
      {
        type: "text",
        text: "Glacier Deep Archive is the lowest-cost storage class, designed for data retained for 7-10 years or longer. Retrieval takes 12-48 hours. Perfect for regulatory archives, medical records, financial records, and data that must be retained but rarely accessed.",
      },
      {
        type: "quiz",
        question: "How long does Deep Archive retrieval take?",
        options: ["12-48 hours", "Minutes", "1-5 hours", "Instant"],
        correctAnswer: "12-48 hours",
      },
    ],
  },
  {
    lessonId: "s3_lesson_32",
    title: "Choosing the Right Storage Class",
    service: "s3",
    roles: ["cloud_practitioner", "solutions_architect", "developer"],
    durationSeconds: 180,
    difficulty: "medium",
    xpReward: 75,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_26", "s3_lesson_27", "s3_lesson_29", "s3_lesson_30", "s3_lesson_31"],
    content: [
      {
        type: "text",
        text: "Choose storage classes based on access patterns and retrieval requirements. Use Standard for active data, Standard-IA for monthly access, Glacier Instant for quarterly access, Glacier Flexible for yearly access, and Deep Archive for long-term retention. Consider using Intelligent-Tiering if patterns are unknown.",
      },
      {
        type: "quiz",
        question: "Which class is best for data accessed monthly?",
        options: ["Standard-IA", "Standard", "Glacier Instant", "Deep Archive"],
        correctAnswer: "Standard-IA",
      },
    ],
  },
  {
    lessonId: "s3_lesson_33",
    title: "S3 Storage Class Transitions",
    service: "s3",
    roles: ["solutions_architect", "developer"],
    durationSeconds: 180,
    difficulty: "medium",
    xpReward: 75,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_32"],
    content: [
      {
        type: "text",
        text: "You can transition objects between storage classes manually or automatically using lifecycle policies. Objects can move from Standard to Standard-IA to Glacier to Deep Archive. However, you can't move backwards (e.g., from Glacier to Standard) - you must restore first.",
      },
      {
        type: "quiz",
        question: "Can objects automatically move from Glacier back to Standard?",
        options: ["No, must restore first", "Yes, automatically", "Only with Intelligent-Tiering", "Only manually"],
        correctAnswer: "No, must restore first",
      },
    ],
  },
  {
    lessonId: "s3_lesson_34",
    title: "S3 Storage Class Pricing",
    service: "s3",
    roles: ["cloud_practitioner", "solutions_architect"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_32"],
    content: [
      {
        type: "text",
        text: "Storage costs decrease as you move to less frequently accessed classes: Standard is most expensive, followed by Standard-IA, Glacier Instant, Glacier Flexible, and Deep Archive (cheapest). However, retrieval costs increase. Balance storage savings against retrieval costs based on your access patterns.",
      },
      {
        type: "quiz",
        question: "Which storage class has the lowest storage cost?",
        options: ["Deep Archive", "Standard", "Standard-IA", "Glacier Instant"],
        correctAnswer: "Deep Archive",
      },
    ],
  },
  {
    lessonId: "s3_lesson_35",
    title: "S3 Storage Class Analysis",
    service: "s3",
    roles: ["solutions_architect", "developer"],
    durationSeconds: 180,
    difficulty: "medium",
    xpReward: 75,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_32"],
    content: [
      {
        type: "text",
        text: "Storage Class Analysis observes data access patterns and recommends when to transition objects to Standard-IA. It generates reports showing access patterns over time. Use these insights to optimize your lifecycle policies and reduce storage costs without impacting performance.",
      },
      {
        type: "quiz",
        question: "What does Storage Class Analysis recommend?",
        options: ["When to transition to Standard-IA", "When to delete objects", "When to encrypt data", "When to backup data"],
        correctAnswer: "When to transition to Standard-IA",
      },
    ],
  },

  // ============================================
  // S3 MODULE 4: DATA MANAGEMENT (15 lessons)
  // ============================================
  {
    lessonId: "s3_lesson_36",
    title: "S3 Lifecycle Policies Overview",
    service: "s3",
    roles: ["solutions_architect", "developer"],
    durationSeconds: 180,
    difficulty: "medium",
    xpReward: 75,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_33"],
    content: [
      {
        type: "text",
        text: "Lifecycle policies automate moving objects between storage classes or deleting them after a specified time. This saves money and reduces management overhead. For example, move logs to Glacier after 90 days and delete after 7 years.",
      },
      {
        type: "quiz",
        question: "What do lifecycle policies automate?",
        options: ["Transitioning and deleting objects", "Uploading files", "Encrypting data", "Creating buckets"],
        correctAnswer: "Transitioning and deleting objects",
      },
    ],
  },
  {
    lessonId: "s3_lesson_37",
    title: "Creating Lifecycle Rules",
    service: "s3",
    roles: ["solutions_architect", "developer"],
    durationSeconds: 180,
    difficulty: "medium",
    xpReward: 75,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_36"],
    content: [
      {
        type: "text",
        text: "Lifecycle rules consist of filters (which objects to apply to) and actions (what to do). You can filter by prefix, tags, or object size. Actions include transitioning to another storage class or expiring (deleting) objects. Rules run daily at midnight UTC.",
      },
      {
        type: "quiz",
        question: "When do lifecycle rules run?",
        options: ["Daily at midnight UTC", "Immediately", "Weekly", "Monthly"],
        correctAnswer: "Daily at midnight UTC",
      },
    ],
  },
  {
    lessonId: "s3_lesson_38",
    title: "S3 Replication Overview",
    service: "s3",
    roles: ["solutions_architect", "sysops_administrator"],
    durationSeconds: 180,
    difficulty: "medium",
    xpReward: 75,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_18"],
    content: [
      {
        type: "text",
        text: "S3 Replication automatically copies objects across buckets. There are two types: Cross-Region Replication (CRR) for different regions and Same-Region Replication (SRR) within the same region. Use cases include compliance, disaster recovery, and reducing latency.",
      },
      {
        type: "quiz",
        question: "What are the two types of S3 replication?",
        options: ["CRR and SRR", "Fast and Slow", "Public and Private", "Standard and Glacier"],
        correctAnswer: "CRR and SRR",
      },
    ],
  },
  {
    lessonId: "s3_lesson_39",
    title: "Cross-Region Replication (CRR)",
    service: "s3",
    roles: ["solutions_architect", "sysops_administrator"],
    durationSeconds: 180,
    difficulty: "medium",
    xpReward: 75,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_38"],
    content: [
      {
        type: "text",
        text: "CRR copies objects to a bucket in a different AWS region. This provides disaster recovery, meets compliance requirements for geographic data storage, and reduces latency by serving content from regions closer to users. Versioning must be enabled on both source and destination buckets.",
      },
      {
        type: "quiz",
        question: "What must be enabled for CRR?",
        options: ["Versioning on both buckets", "Public access", "Encryption", "Logging"],
        correctAnswer: "Versioning on both buckets",
      },
    ],
  },
  {
    lessonId: "s3_lesson_40",
    title: "Same-Region Replication (SRR)",
    service: "s3",
    roles: ["solutions_architect", "sysops_administrator"],
    durationSeconds: 180,
    difficulty: "medium",
    xpReward: 75,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_38"],
    content: [
      {
        type: "text",
        text: "SRR copies objects between buckets in the same region. Use cases include aggregating logs from multiple buckets, replicating between production and test accounts, or maintaining copies with different encryption or ownership. It's faster and cheaper than CRR.",
      },
      {
        type: "quiz",
        question: "Why use SRR instead of CRR?",
        options: ["Faster and cheaper for same-region needs", "Better security", "More storage", "Automatic encryption"],
        correctAnswer: "Faster and cheaper for same-region needs",
      },
    ],
  },
  {
    lessonId: "s3_lesson_41",
    title: "S3 Batch Operations",
    service: "s3",
    roles: ["solutions_architect", "developer"],
    durationSeconds: 180,
    difficulty: "medium",
    xpReward: 75,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_1"],
    content: [
      {
        type: "text",
        text: "S3 Batch Operations performs large-scale operations on billions of objects with a single request. You can copy objects, invoke Lambda functions, restore from Glacier, modify metadata, or change ACLs. It provides completion reports and retry failed operations.",
      },
      {
        type: "quiz",
        question: "What can S3 Batch Operations do?",
        options: ["Perform operations on billions of objects", "Create buckets", "Monitor costs", "Encrypt single files"],
        correctAnswer: "Perform operations on billions of objects",
      },
    ],
  },
  {
    lessonId: "s3_lesson_42",
    title: "S3 Inventory",
    service: "s3",
    roles: ["solutions_architect", "sysops_administrator"],
    durationSeconds: 180,
    difficulty: "medium",
    xpReward: 75,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_1"],
    content: [
      {
        type: "text",
        text: "S3 Inventory provides scheduled reports of your objects and their metadata. Reports can be generated daily or weekly in CSV, ORC, or Parquet format. Use inventory for compliance audits, analyzing storage usage, or as input for Batch Operations.",
      },
      {
        type: "quiz",
        question: "How often can S3 Inventory reports be generated?",
        options: ["Daily or weekly", "Hourly", "Monthly", "Real-time only"],
        correctAnswer: "Daily or weekly",
      },
    ],
  },
  {
    lessonId: "s3_lesson_43",
    title: "S3 Object Tagging",
    service: "s3",
    roles: ["solutions_architect", "developer"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_3"],
    content: [
      {
        type: "text",
        text: "Tags are key-value pairs you can assign to S3 objects. Use tags to categorize objects (e.g., project=marketing, environment=production), control access with IAM policies, manage lifecycle rules, or track costs. Each object can have up to 10 tags.",
      },
      {
        type: "quiz",
        question: "How many tags can an S3 object have?",
        options: ["Up to 10", "Unlimited", "Up to 5", "Only 1"],
        correctAnswer: "Up to 10",
      },
    ],
  },
  {
    lessonId: "s3_lesson_44",
    title: "S3 Object Metadata",
    service: "s3",
    roles: ["solutions_architect", "developer"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_3"],
    content: [
      {
        type: "text",
        text: "Metadata is data about your objects. System metadata (like Content-Type, Last-Modified) is set by S3. User-defined metadata (custom key-value pairs) is set by you. Metadata is stored with the object and returned when you retrieve it.",
      },
      {
        type: "quiz",
        question: "What are the two types of S3 metadata?",
        options: ["System and user-defined", "Public and private", "Encrypted and unencrypted", "Standard and Glacier"],
        correctAnswer: "System and user-defined",
      },
    ],
  },
  {
    lessonId: "s3_lesson_45",
    title: "S3 Multipart Upload",
    service: "s3",
    roles: ["developer", "solutions_architect"],
    durationSeconds: 180,
    difficulty: "medium",
    xpReward: 75,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_3"],
    content: [
      {
        type: "text",
        text: "Multipart upload allows you to upload large objects in parts. Benefits include improved throughput (upload parts in parallel), quick recovery from network issues (restart failed parts only), and ability to upload before knowing final size. Recommended for objects over 100MB, required for objects over 5GB.",
      },
      {
        type: "quiz",
        question: "When is multipart upload required?",
        options: ["Objects over 5GB", "Objects over 100MB", "All uploads", "Only for videos"],
        correctAnswer: "Objects over 5GB",
      },
    ],
  },
  {
    lessonId: "s3_lesson_46",
    title: "S3 Transfer Acceleration",
    service: "s3",
    roles: ["developer", "solutions_architect"],
    durationSeconds: 180,
    difficulty: "medium",
    xpReward: 75,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_1"],
    content: [
      {
        type: "text",
        text: "Transfer Acceleration speeds up uploads to S3 by using Amazon CloudFront's globally distributed edge locations. Data is routed to S3 over optimized network paths. It can be 50-500% faster for long-distance transfers. Perfect for uploading from around the world to a central bucket.",
      },
      {
        type: "quiz",
        question: "What does Transfer Acceleration use?",
        options: ["CloudFront edge locations", "More storage", "Compression", "Smaller files"],
        correctAnswer: "CloudFront edge locations",
      },
    ],
  },
  {
    lessonId: "s3_lesson_47",
    title: "S3 Select",
    service: "s3",
    roles: ["developer", "solutions_architect"],
    durationSeconds: 180,
    difficulty: "medium",
    xpReward: 75,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_3"],
    content: [
      {
        type: "text",
        text: "S3 Select retrieves only a subset of data from an object using SQL expressions. Instead of downloading the entire object, you can filter and retrieve just the data you need. This reduces data transfer, costs, and latency. Works with CSV, JSON, and Parquet files.",
      },
      {
        type: "quiz",
        question: "What does S3 Select use to filter data?",
        options: ["SQL expressions", "Regular expressions", "Tags", "Metadata"],
        correctAnswer: "SQL expressions",
      },
    ],
  },
  {
    lessonId: "s3_lesson_48",
    title: "S3 Object Lambda",
    service: "s3",
    roles: ["developer", "solutions_architect"],
    durationSeconds: 180,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_3"],
    content: [
      {
        type: "text",
        text: "S3 Object Lambda lets you add your own code to process data as it's retrieved from S3. Use cases include redacting PII, converting formats, resizing images, or enriching data. Your Lambda function runs automatically when objects are requested, without changing the stored object.",
      },
      {
        type: "quiz",
        question: "When does S3 Object Lambda run?",
        options: ["When objects are retrieved", "When objects are uploaded", "Daily", "On demand only"],
        correctAnswer: "When objects are retrieved",
      },
    ],
  },
  {
    lessonId: "s3_lesson_49",
    title: "S3 Event Notifications",
    service: "s3",
    roles: ["developer", "solutions_architect"],
    durationSeconds: 180,
    difficulty: "medium",
    xpReward: 75,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_3"],
    content: [
      {
        type: "text",
        text: "S3 can send notifications when events occur (object created, deleted, restored). Notifications can trigger Lambda functions, send messages to SNS topics, or add messages to SQS queues. Use this to build event-driven workflows, like processing uploaded images or indexing documents.",
      },
      {
        type: "quiz",
        question: "What can S3 event notifications trigger?",
        options: ["Lambda, SNS, or SQS", "Only email", "Only Lambda", "Only logging"],
        correctAnswer: "Lambda, SNS, or SQS",
      },
    ],
  },
  {
    lessonId: "s3_lesson_50",
    title: "S3 Requester Pays",
    service: "s3",
    roles: ["solutions_architect", "developer"],
    durationSeconds: 180,
    difficulty: "medium",
    xpReward: 75,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_1"],
    content: [
      {
        type: "text",
        text: "With Requester Pays, the requester pays for data transfer and requests instead of the bucket owner. The bucket owner still pays for storage. This is useful for sharing large datasets where you want users to pay for their own downloads. Requesters must be authenticated AWS users.",
      },
      {
        type: "quiz",
        question: "In Requester Pays, who pays for data transfer?",
        options: ["The requester", "The bucket owner", "AWS", "No one"],
        correctAnswer: "The requester",
      },
    ],
  },

  // ============================================
  // EC2, Lambda, IAM lessons (keeping existing)
  // ============================================
  {
    lessonId: "ec2_lesson_1",
    title: "Introduction to EC2",
    service: "ec2",
    roles: ["cloud_practitioner", "solutions_architect", "sysops_administrator"],
    durationSeconds: 300,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    content: [
      {
        type: "text",
        text: "Amazon EC2 (Elastic Compute Cloud) provides scalable computing capacity in the AWS cloud. Think of it as renting a computer in the cloud that you can configure however you want.",
      },
      {
        type: "quiz",
        question: "What does EC2 stand for?",
        options: [
          "Elastic Compute Cloud",
          "Easy Cloud Computing",
          "Enterprise Cloud Capacity",
          "Elastic Container Cloud",
        ],
        correctAnswer: "Elastic Compute Cloud",
      },
    ],
  },
  
  // ============================================
  // LAMBDA MODULE 1: FUNDAMENTALS (10 lessons)
  // ============================================
  {
    lessonId: "lambda_lesson_1",
    title: "What is AWS Lambda?",
    service: "lambda",
    roles: ["developer", "solutions_architect", "devops_engineer"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    content: [
      {
        type: "text",
        text: "AWS Lambda is a serverless compute service that lets you run code without provisioning or managing servers. You simply upload your code, and Lambda takes care of everything required to run and scale your code with high availability.",
      },
      {
        type: "quiz",
        question: "What is the main benefit of AWS Lambda?",
        options: ["No server management required", "Unlimited free tier", "Faster than all other services", "Built-in database"],
        correctAnswer: "No server management required",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_2",
    title: "Serverless Computing Explained",
    service: "lambda",
    roles: ["developer", "solutions_architect", "cloud_practitioner"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_1"],
    content: [
      {
        type: "text",
        text: "Serverless doesn't mean there are no servers - it means you don't have to think about them. AWS manages the infrastructure, and you focus on writing code. You pay only for the compute time you consume.",
      },
      {
        type: "quiz",
        question: "In serverless computing, who manages the servers?",
        options: ["AWS manages them", "You manage them", "No one manages them", "Third-party vendors"],
        correctAnswer: "AWS manages them",
      },
    ],
  },
];

// Helper function to get lessons by service
export const getLessonsByService = (service: string): Lesson[] => {
  return lessons.filter((lesson) => lesson.service === service);
};

// Helper function to get lessons by role
export const getLessonsByRole = (role: string): Lesson[] => {
  return lessons.filter((lesson) => lesson.roles.includes(role));
};

// Helper function to get lesson by ID
export const getLessonById = (lessonId: string): Lesson | undefined => {
  return lessons.find((lesson) => lesson.lessonId === lessonId);
};
