import { Lesson } from "../../../types/lesson";

// S3 Lessons - Comprehensive coverage from the Amazon S3 User Guide
// Organized into 10 modules across all major S3 topics
// Module 1:  Fundamentals (10 lessons)
// Module 2:  Security & Permissions (15 lessons)
// Module 3:  Storage Classes (10 lessons)
// Module 4:  Data Management (15 lessons)
// Module 5:  Bucket Types & Advanced Features (10 lessons)
// Module 6:  Data Protection & Replication (10 lessons)
// Module 7:  Lifecycle Management (8 lessons)
// Module 8:  Monitoring, Logging & Analytics (8 lessons)
// Module 9:  Performance Optimization (7 lessons)
// Module 10: Static Website Hosting & Advanced Use Cases (7 lessons)

export const s3Lessons: Lesson[] = [
  // ============================================
  // S3 MODULE 1: FUNDAMENTALS (10 lessons)
  // ============================================
  {
    lessonId: "s3_lesson_1",
    title: "What is Amazon S3?",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_data_engineer", "software_development_engineer", "cloud_administrator", "cloud_engineer", "cloud_devops_engineer", "cloud_security_engineer"],
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
    roles: ["solutions_architect", "application_architect", "cloud_data_engineer", "software_development_engineer", "cloud_administrator", "cloud_engineer", "cloud_devops_engineer", "cloud_security_engineer"],
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
    title: "S3 Objects and Keys",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_data_engineer", "software_development_engineer", "cloud_administrator", "cloud_engineer", "cloud_devops_engineer", "cloud_security_engineer"],
    durationSeconds: 240,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_2"],
    content: [
      {
        type: "text",
        text: "Objects are the fundamental entities stored in Amazon S3. Each object consists of two parts: the data itself (the file), and metadata — a set of name-value pairs that describe the object. Metadata includes system-defined information like the last modified date and Content-Type, as well as custom metadata you can define.",
      },
      {
        type: "text",
        text: "Every object in a bucket is uniquely identified by a key (also called a key name). Think of the key as the full path to your file. For example, if you store a photo at 'photos/puppy.jpg' in the bucket 'amzn-s3-demo-bucket', the full URL would be: https://amzn-s3-demo-bucket.s3.us-west-2.amazonaws.com/photos/puppy.jpg",
      },
      {
        type: "quiz",
        question: "What uniquely identifies an object within an S3 bucket?",
        options: ["The object's key (key name)", "The object's file size", "The object's creation date", "The object's Content-Type"],
        correctAnswer: "The object's key (key name)",
      },
      {
        type: "text",
        text: "You can think of Amazon S3 as a basic data map between 'bucket + key + version' and the object itself. Every object in Amazon S3 can be uniquely addressed through the combination of the web service endpoint, bucket name, and key.",
      },
    ],
  },
  {
    lessonId: "s3_lesson_4",
    title: "The Four S3 Bucket Types",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_data_engineer", "software_development_engineer", "cloud_administrator", "cloud_engineer", "cloud_devops_engineer", "cloud_security_engineer"],
    durationSeconds: 300,
    difficulty: "easy",
    xpReward: 60,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_2"],
    content: [
      {
        type: "text",
        text: "Amazon S3 now supports four types of buckets, each designed for specific use cases:\n\n1. General Purpose Buckets – The original and most common type. Recommended for most use cases. You can store any number of objects across all storage classes (except S3 Express One Zone).\n\n2. Directory Buckets – Designed for low-latency and data-residency workloads. Objects are organized into hierarchical directories. Supports the S3 Express One Zone storage class.\n\n3. Table Buckets – Optimized for tabular data (like database tables) in Apache Iceberg format. Great for analytics and machine learning workloads using Amazon Athena or Redshift.\n\n4. Vector Buckets – Purpose-built to store and query vector embeddings, supporting similarity search for AI/ML applications.",
      },
      {
        type: "quiz",
        question: "Which S3 bucket type is recommended for storing tabular data for analytics workloads?",
        options: ["Table buckets", "General purpose buckets", "Directory buckets", "Vector buckets"],
        correctAnswer: "Table buckets",
      },
      {
        type: "quiz",
        question: "Which bucket type is designed for low-latency workloads with single-digit millisecond access?",
        options: ["Directory buckets (S3 Express One Zone)", "General purpose buckets", "Table buckets", "Vector buckets"],
        correctAnswer: "Directory buckets (S3 Express One Zone)",
      },
    ],
  },
  {
    lessonId: "s3_lesson_5",
    title: "S3 Data Consistency Model",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_data_engineer", "software_development_engineer", "cloud_administrator", "cloud_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 70,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_3"],
    content: [
      {
        type: "text",
        text: "Amazon S3 provides strong read-after-write consistency for PUT and DELETE requests in all AWS Regions. This means that after a successful write (PUT) of a new or overwritten object, any subsequent read (GET or LIST) will immediately return the latest version of that object. There is no eventual consistency lag for object operations.",
      },
      {
        type: "text",
        text: "Here's what strong consistency means in practice:\n• After you write a new object and immediately list keys in the bucket, the new object appears in the list.\n• After you replace an existing object and immediately try to read it, S3 returns the new data.\n• After you delete an object and immediately try to read it, S3 returns no data.\n\nImportant: S3 does NOT support object locking for concurrent writers. If two PUT requests are made to the same key simultaneously, the request with the latest timestamp wins.",
      },
      {
        type: "quiz",
        question: "After a successful PUT request to Amazon S3, what consistency can you expect for subsequent GET requests?",
        options: ["Strong read-after-write consistency", "Eventual consistency within 15 seconds", "Eventual consistency within 1 minute", "No consistency guarantee"],
        correctAnswer: "Strong read-after-write consistency",
      },
      {
        type: "text",
        text: "Note: Bucket configuration changes (like enabling versioning) follow an eventual consistency model. AWS recommends waiting 15 minutes after enabling versioning before issuing write operations on objects in that bucket.",
      },
    ],
  },
  {
    lessonId: "s3_lesson_6",
    title: "Accessing Amazon S3",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "software_development_engineer", "cloud_administrator", "cloud_engineer", "cloud_devops_engineer"],
    durationSeconds: 240,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_2"],
    content: [
      {
        type: "text",
        text: "You can interact with Amazon S3 in four main ways:\n\n1. AWS Management Console – A web-based UI at console.aws.amazon.com/s3. Best for visual exploration and one-off tasks.\n\n2. AWS CLI – Command-line tool for scripting and automation. Supports both 's3api' (fine-grained API calls) and 's3' (higher-level commands like sync and cp).\n\n3. AWS SDKs – Libraries for Java, Python, .NET, JavaScript, Go, Ruby, and more. They handle request signing, retries, and error handling automatically.\n\n4. Amazon S3 REST API – Direct HTTP interface for language-agnostic programmatic access. Requires you to compute and sign requests manually.",
      },
      {
        type: "quiz",
        question: "Which method of accessing S3 handles request signing and retries automatically on your behalf?",
        options: ["AWS SDKs", "REST API", "AWS CLI only", "S3 Console only"],
        correctAnswer: "AWS SDKs",
      },
      {
        type: "text",
        text: "Every interaction with Amazon S3 is either authenticated or anonymous. The AWS SDKs compute the authentication signature automatically from the keys you provide. Note: SOAP API support over HTTP is deprecated; use the REST API or SDKs instead.",
      },
    ],
  },
  {
    lessonId: "s3_lesson_7",
    title: "S3 Regions and Global Namespaces",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_administrator", "cloud_engineer", "cloud_devops_engineer"],
    durationSeconds: 240,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_2"],
    content: [
      {
        type: "text",
        text: "When you create an S3 bucket, you choose an AWS Region. This matters for three reasons:\n1. Latency – Choosing a Region close to your users reduces latency.\n2. Cost – Data transfer pricing varies by Region.\n3. Compliance – Some regulations require data to stay within specific geographies.\n\nCrucially: objects stored in an AWS Region NEVER leave that Region unless you explicitly replicate or transfer them. For example, objects in Europe (Ireland) stay there.",
      },
      {
        type: "text",
        text: "General purpose bucket names exist in a global namespace, meaning they must be unique across ALL AWS accounts in a given partition. AWS has four partitions: 'aws' (Standard Regions), 'aws-cn' (China), 'aws-us-gov' (GovCloud), and 'aws-eusc' (European Sovereign Cloud). After creation, you cannot change a bucket's name or its Region.",
      },
      {
        type: "quiz",
        question: "Can you change the AWS Region of an S3 bucket after it has been created?",
        options: ["No, the Region cannot be changed after creation", "Yes, but only within the same partition", "Yes, using the S3 console", "Yes, using the AWS CLI"],
        correctAnswer: "No, the Region cannot be changed after creation",
      },
    ],
  },
  {
    lessonId: "s3_lesson_8",
    title: "S3 Bucket Naming Rules",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "software_development_engineer", "cloud_administrator", "cloud_engineer", "cloud_devops_engineer"],
    durationSeconds: 240,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_2"],
    content: [
      {
        type: "text",
        text: "General purpose bucket names must follow these rules:\n• Between 3 and 63 characters long\n• Can only contain lowercase letters, numbers, and hyphens (-)\n• Must begin and end with a letter or number\n• Cannot be formatted as an IP address (e.g., 192.168.5.4)\n• Must be globally unique across all AWS accounts in the partition\n• Once created, the name cannot be changed\n\nBest practice: Use a naming convention like {company}-{environment}-{purpose}, e.g., 'acme-prod-user-uploads'.",
      },
      {
        type: "quiz",
        question: "Which of the following is a valid S3 general purpose bucket name?",
        options: ["my-prod-data-bucket", "My_Prod_Data_Bucket", "192.168.1.1", "my..bucket"],
        correctAnswer: "my-prod-data-bucket",
      },
      {
        type: "quiz",
        question: "What is the maximum length for a general purpose S3 bucket name?",
        options: ["63 characters", "128 characters", "255 characters", "32 characters"],
        correctAnswer: "63 characters",
      },
    ],
  },
  {
    lessonId: "s3_lesson_9",
    title: "Object Metadata: System-Defined and User-Defined",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_data_engineer", "software_development_engineer", "cloud_administrator", "cloud_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 70,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_3"],
    content: [
      {
        type: "text",
        text: "Every S3 object has two categories of metadata:\n\n1. System-defined metadata – Automatically maintained by S3. Includes:\n   • Date: Creation timestamp (read-only)\n   • Content-Length: Object size in bytes (read-only)\n   • ETag: MD5 digest for non-multipart, non-SSE-S3-encrypted objects (read-only)\n   • Last-Modified: Most recent modification date (read-only)\n   • Content-Type: MIME type of the object (user-modifiable)\n   • x-amz-storage-class: The object's storage class (user-modifiable)\n   • x-amz-server-side-encryption: Whether SSE is enabled (user-modifiable)\n\n2. User-defined metadata – Custom name-value pairs you set at upload time. Keys must be prefixed with 'x-amz-meta-'.",
      },
      {
        type: "quiz",
        question: "Which system-defined metadata field is user-modifiable?",
        options: ["Content-Type", "Content-Length", "ETag", "Date"],
        correctAnswer: "Content-Type",
      },
      {
        type: "text",
        text: "Important limitation: After you upload an object, you cannot modify its user-defined metadata directly. To change user-defined metadata, you must copy the object to itself with the new metadata values. The PUT request header is limited to 8 KB in total size, with system-defined metadata limited to 2 KB.",
      },
    ],
  },
  {
    lessonId: "s3_lesson_10",
    title: "S3 Key Naming Guidelines and Sort Order",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_data_engineer", "software_development_engineer", "cloud_administrator", "cloud_engineer"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 60,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_3"],
    content: [
      {
        type: "text",
        text: "Object keys can contain any UTF-8 character, but some characters require special handling in URLs and XML. Characters that are safe without encoding: letters (a–z, A–Z), digits (0–9), and the special characters: hyphen (-), underscore (_), period (.), and tilde (~).\n\nCharacters that require URL encoding include: spaces, ampersands (&), plus signs (+), equal signs (=), and many others. Using slashes (/) in key names simulates a folder hierarchy, e.g., 'logs/2024/01/access.log'.",
      },
      {
        type: "text",
        text: "Amazon S3 sorts object keys lexicographically by their UTF-8 encoded byte values. The sort order is:\n1. Special characters (e.g., !, /)\n2. Uppercase letters (A–Z)\n3. Lowercase letters (a–z)\n4. Non-ASCII characters (e.g., é, 中文) sort after ASCII because of higher byte values.\n\nThis affects how objects appear in listings and matters when designing key prefix strategies for high-throughput workloads.",
      },
      {
        type: "quiz",
        question: "In S3 key sort order, which prefix would appear FIRST in a listing?",
        options: ["Apple/", "apple/", "éclair/", "#items/"],
        correctAnswer: "Apple/",
      },
    ],
  },

  // ============================================
  // S3 MODULE 2: SECURITY & PERMISSIONS (15 lessons)
  // ============================================
  {
    lessonId: "s3_lesson_11",
    title: "S3 Security Fundamentals: Private by Default",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_administrator", "cloud_engineer", "cloud_devops_engineer", "cloud_security_engineer"],
    durationSeconds: 240,
    difficulty: "easy",
    xpReward: 60,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_2"],
    content: [
      {
        type: "text",
        text: "By default, all S3 buckets and the objects in them are private. Only the AWS account that created the bucket (the bucket owner) has access. To grant access to others, you must explicitly configure permissions using one or more of S3's access control mechanisms.",
      },
      {
        type: "text",
        text: "Amazon S3 provides several tools to manage access:\n• Bucket policies – JSON-based IAM policies applied at the bucket level\n• IAM identity-based policies – Policies attached to users, groups, or roles\n• Access Control Lists (ACLs) – Legacy mechanism, disabled by default on new buckets\n• S3 Access Points – Named network endpoints with dedicated access policies\n• S3 Access Grants – Grants access using corporate directory identities\n• Block Public Access – Account and bucket-level settings to prevent public exposure",
      },
      {
        type: "quiz",
        question: "What is the default access level for a newly created S3 bucket?",
        options: ["Private – only the bucket owner has access", "Public read for authenticated AWS users", "Public read and write for everyone", "Private for the Region only"],
        correctAnswer: "Private – only the bucket owner has access",
      },
    ],
  },
  {
    lessonId: "s3_lesson_12",
    title: "S3 Block Public Access",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_administrator", "cloud_engineer", "cloud_security_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 70,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_11"],
    content: [
      {
        type: "text",
        text: "S3 Block Public Access is a set of guardrails that prevent public access to your buckets and objects, regardless of bucket policies or ACLs. It operates at two levels:\n\n• Account level – Applies to ALL buckets in your account\n• Bucket level – Applies to a single bucket\n\nBlock Public Access provides four settings that can be enabled or disabled independently:\n1. BlockPublicAcls – Blocks new public ACLs and blocks public ACL access\n2. IgnorePublicAcls – Ignores all public ACLs on the bucket and objects\n3. BlockPublicPolicy – Blocks new bucket policies that allow public access\n4. RestrictPublicBuckets – Blocks access from any principal that's not in your account",
      },
      {
        type: "quiz",
        question: "At which levels can S3 Block Public Access settings be applied?",
        options: ["Account level and bucket level", "Object level only", "Bucket level only", "Account level only"],
        correctAnswer: "Account level and bucket level",
      },
      {
        type: "text",
        text: "Best practice: AWS recommends keeping all Block Public Access settings enabled unless you have a specific use case that requires public access (e.g., hosting a static website). You can use IAM Access Analyzer for S3 to evaluate and monitor your bucket access policies and identify unintended public access.",
      },
    ],
  },
  {
    lessonId: "s3_lesson_13",
    title: "S3 Bucket Policies",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_administrator", "cloud_engineer", "cloud_devops_engineer", "cloud_security_engineer"],
    durationSeconds: 360,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_11"],
    content: [
      {
        type: "text",
        text: "A bucket policy is a resource-based AWS IAM policy written in JSON that controls access to a bucket and the objects within it. Key characteristics:\n• Only the bucket owner can attach a policy to a bucket\n• Maximum policy size: 20 KB\n• Permissions apply to all objects owned by the bucket owner\n• Support wildcard characters on ARNs to grant access to subsets of objects",
      },
      {
        type: "text",
        text: "A bucket policy can allow or deny actions based on:\n• The requester (specific IAM user, role, account, or anonymous)\n• The S3 actions (e.g., s3:GetObject, s3:PutObject)\n• The resource (specific objects or key prefixes)\n• Conditions (e.g., IP address, time of day, MFA status, encryption headers)\n\nExample use cases: Grant cross-account upload access, require HTTPS only, restrict access to a VPC endpoint, or enforce server-side encryption on uploads.",
      },
      {
        type: "quiz",
        question: "What is the maximum size of an S3 bucket policy?",
        options: ["20 KB", "10 KB", "50 KB", "100 KB"],
        correctAnswer: "20 KB",
      },
      {
        type: "quiz",
        question: "Who can attach a policy to an S3 bucket?",
        options: ["Only the bucket owner", "Any IAM user with s3:PutBucketPolicy permission", "Any AWS account", "Only the root account"],
        correctAnswer: "Only the bucket owner",
      },
    ],
  },
  {
    lessonId: "s3_lesson_14",
    title: "IAM Policies for S3 Access",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_administrator", "cloud_engineer", "cloud_security_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_11"],
    content: [
      {
        type: "text",
        text: "IAM identity-based policies are attached to IAM users, groups, or roles to grant S3 permissions. Unlike bucket policies (which are attached to the bucket), identity-based policies are attached to the requester's identity.\n\nWhen evaluating access, AWS combines both bucket policies and IAM policies. The requester must be allowed by BOTH (unless one is explicitly denied, in which case the deny wins). This is called the 'principle of least privilege' in action.",
      },
      {
        type: "text",
        text: "Common S3 IAM permission groups:\n• Object operations: s3:GetObject, s3:PutObject, s3:DeleteObject, s3:ListBucket\n• Bucket operations: s3:CreateBucket, s3:DeleteBucket, s3:GetBucketPolicy, s3:PutBucketPolicy\n• Multi-part upload: s3:ListMultipartUploadParts, s3:AbortMultipartUpload\n• Advanced: s3:GetBucketVersioning, s3:PutBucketVersioning, s3:ReplicateObject\n\nBest practice: Use IAM roles (not user credentials) for applications, and scope permissions to specific buckets and prefixes using resource ARNs.",
      },
      {
        type: "quiz",
        question: "If an IAM identity policy allows s3:GetObject but the bucket policy explicitly denies it, what happens?",
        options: ["Access is denied – explicit denies always win", "Access is allowed – IAM policy takes precedence", "Access is allowed – the most permissive policy wins", "S3 prompts the user to confirm"],
        correctAnswer: "Access is denied – explicit denies always win",
      },
    ],
  },
  {
    lessonId: "s3_lesson_15",
    title: "S3 Access Control Lists (ACLs)",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator", "cloud_engineer", "cloud_security_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 70,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_11"],
    content: [
      {
        type: "text",
        text: "Access Control Lists (ACLs) are a legacy access control mechanism predating IAM. Each S3 general purpose bucket and object has an ACL attached to it as a subresource. ACLs define which AWS accounts or groups are granted access and the type of access (READ, WRITE, READ_ACP, WRITE_ACP, FULL_CONTROL).",
      },
      {
        type: "text",
        text: "Important: By default in new buckets, ACLs are DISABLED. The current default setting is 'Bucket owner enforced', which means:\n• All ACLs are disabled\n• The bucket owner owns all objects (even those uploaded by other accounts)\n• Access is managed exclusively via bucket policies and IAM policies\n\nAWS recommends keeping ACLs disabled for most use cases. Only enable ACLs if you need to control access for each object individually, especially when multiple accounts upload to the same bucket and each account needs to retain ownership of their uploaded objects.",
      },
      {
        type: "quiz",
        question: "What is the recommended approach for access control in modern S3 usage?",
        options: ["Use bucket policies and IAM policies instead of ACLs", "Use ACLs as the primary access control mechanism", "Use ACLs for objects and bucket policies for buckets", "Use only IAM user policies"],
        correctAnswer: "Use bucket policies and IAM policies instead of ACLs",
      },
    ],
  },
  {
    lessonId: "s3_lesson_16",
    title: "S3 Access Points",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_administrator", "cloud_engineer", "cloud_security_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_13"],
    content: [
      {
        type: "text",
        text: "S3 Access Points are named network endpoints with dedicated access policies that simplify managing data access at scale for shared datasets. Instead of maintaining one complex bucket policy that serves all users, you can create multiple access points, each with its own policy tailored for a specific team or application.",
      },
      {
        type: "text",
        text: "Key characteristics of S3 Access Points:\n• Each access point has its own policy (separate from the bucket policy)\n• Can be configured to accept requests only from a VPC (restricting to private network)\n• Each access point has its own Block Public Access settings\n• Support both general purpose buckets and directory buckets\n• Access points have unique hostnames that can be used as the S3 endpoint\n• You can restrict access by IP ranges or VPC endpoint IDs in the access point policy",
      },
      {
        type: "quiz",
        question: "What is the primary benefit of using S3 Access Points over a single complex bucket policy?",
        options: ["Simplified per-team or per-application access management at scale", "Faster object retrieval", "Automatic encryption of all objects", "Cross-region data replication"],
        correctAnswer: "Simplified per-team or per-application access management at scale",
      },
    ],
  },
  {
    lessonId: "s3_lesson_17",
    title: "S3 Object Ownership",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_administrator", "cloud_engineer", "cloud_security_engineer"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 70,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_15"],
    content: [
      {
        type: "text",
        text: "S3 Object Ownership is a bucket-level setting that controls who owns uploaded objects and whether ACLs are enabled. There are three settings:\n\n1. Bucket owner enforced (default for new buckets) – ACLs are disabled. The bucket owner automatically owns and has full control over every object, regardless of who uploaded it.\n\n2. Bucket owner preferred – ACLs are enabled. If an uploader uses the bucket-owner-full-control ACL, the bucket owner owns the object. Otherwise, the uploader retains ownership.\n\n3. Object writer – ACLs are enabled. The AWS account that uploads an object owns it (legacy behavior).",
      },
      {
        type: "quiz",
        question: "With the 'Bucket owner enforced' Object Ownership setting, what happens when a different AWS account uploads an object to your bucket?",
        options: ["The bucket owner automatically owns the object", "The uploading account retains ownership", "The object is rejected unless the uploader grants full control", "Ownership is shared between both accounts"],
        correctAnswer: "The bucket owner automatically owns the object",
      },
    ],
  },
  {
    lessonId: "s3_lesson_18",
    title: "Server-Side Encryption (SSE) Overview",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_administrator", "cloud_engineer", "cloud_security_engineer"],
    durationSeconds: 360,
    difficulty: "medium",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_11"],
    content: [
      {
        type: "text",
        text: "Server-Side Encryption (SSE) protects data at rest by encrypting objects when they are stored. Amazon S3 offers three SSE options:\n\n1. SSE-S3 – Amazon S3 manages the encryption keys. Uses AES-256. Enabled by default on all new buckets. No additional cost.\n\n2. SSE-KMS – AWS Key Management Service (KMS) manages the keys. Provides audit trails, key rotation, and finer-grained access control. Incurs KMS costs. You can use AWS managed keys or customer managed keys (CMKs).\n\n3. SSE-C – You (the customer) provide and manage the encryption keys. S3 performs encryption/decryption but does not store your key — you must provide it with every request.",
      },
      {
        type: "quiz",
        question: "Which SSE option requires you to provide the encryption key with every GET and PUT request?",
        options: ["SSE-C (Customer-Provided Keys)", "SSE-S3 (S3 Managed Keys)", "SSE-KMS (KMS Managed Keys)", "DSSE-KMS (Dual-Layer KMS)"],
        correctAnswer: "SSE-C (Customer-Provided Keys)",
      },
      {
        type: "text",
        text: "There's also DSSE-KMS (Dual-Layer Server-Side Encryption with KMS) for workloads requiring two independent layers of encryption to meet compliance requirements. Additionally, all S3 Express One Zone (directory bucket) objects are automatically encrypted with SSE-S3 and optionally support SSE-KMS, but do NOT support SSE-C or DSSE-KMS.",
      },
      {
        type: "quiz",
        question: "Which SSE option is automatically enabled by default on all new general purpose S3 buckets?",
        options: ["SSE-S3", "SSE-KMS", "SSE-C", "No encryption by default"],
        correctAnswer: "SSE-S3",
      },
    ],
  },
  {
    lessonId: "s3_lesson_19",
    title: "S3 Bucket Policies: Cross-Account Access",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_administrator", "cloud_security_engineer"],
    durationSeconds: 300,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_13", "s3_lesson_14"],
    content: [
      {
        type: "text",
        text: "Cross-account access allows users or services in one AWS account to access S3 resources in a different account. To grant cross-account access:\n\n1. The bucket policy in the destination account must allow the source account (using the Principal element with the cross-account ARN).\n2. The IAM policy in the source account must also allow the S3 actions.\n\nBoth policies must grant the permission — it's not enough for just one side to allow it.",
      },
      {
        type: "code",
        text: `// Example: Bucket policy granting cross-account read access
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CrossAccountRead",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::123456789012:root"
      },
      "Action": ["s3:GetObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::my-bucket",
        "arn:aws:s3:::my-bucket/*"
      ]
    }
  ]
}`,
      },
      {
        type: "quiz",
        question: "To allow a user in Account B to read from a bucket in Account A, what is required?",
        options: ["Both the bucket policy in Account A AND the IAM policy in Account B must allow the access", "Only the bucket policy in Account A needs to allow access", "Only the IAM policy in Account B needs to allow access", "No policy is needed if both accounts are in the same Organization"],
        correctAnswer: "Both the bucket policy in Account A AND the IAM policy in Account B must allow the access",
      },
    ],
  },
  {
    lessonId: "s3_lesson_20",
    title: "Presigned URLs",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "software_development_engineer", "cloud_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_11"],
    content: [
      {
        type: "text",
        text: "A presigned URL is a time-limited URL that grants temporary access to a specific S3 object without requiring the requester to have AWS credentials. Anyone with the URL can perform the allowed action (GET or PUT) on the object until the URL expires.\n\nCommon use cases:\n• Allow users to download a private file from a web app\n• Allow users to upload directly to S3 from a browser without exposing credentials\n• Share a private document with a client for a limited time",
      },
      {
        type: "text",
        text: "Key characteristics of presigned URLs:\n• The URL includes the action, expiration time, and a cryptographic signature\n• The permissions are bounded by the permissions of the identity that created the URL\n• Expiration time can range from seconds to 7 days (for IAM role-based presigned URLs, limited to the role's session duration)\n• You can create presigned URLs using the AWS CLI, SDKs, or REST API\n• If the creator loses access to the resource before the URL expires, the URL will also stop working",
      },
      {
        type: "quiz",
        question: "If a presigned URL is created by a user who is later denied access to the S3 bucket, what happens to the presigned URL?",
        options: ["The presigned URL also stops working", "The presigned URL continues to work until it expires", "The presigned URL works for 5 more minutes then expires", "The presigned URL becomes permanently invalid immediately"],
        correctAnswer: "The presigned URL also stops working",
      },
    ],
  },
  {
    lessonId: "s3_lesson_21",
    title: "Encryption in Transit",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_administrator", "cloud_engineer", "cloud_security_engineer"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 70,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_18"],
    content: [
      {
        type: "text",
        text: "S3 supports HTTPS (TLS) to encrypt data in transit between the client and S3 endpoints. To enforce HTTPS and prevent HTTP connections, you can add a bucket policy condition that denies requests where 'aws:SecureTransport' is false.",
      },
      {
        type: "code",
        text: `// Bucket policy to enforce HTTPS only
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyHTTP",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::my-bucket",
        "arn:aws:s3:::my-bucket/*"
      ],
      "Condition": {
        "Bool": {
          "aws:SecureTransport": "false"
        }
      }
    }
  ]
}`,
      },
      {
        type: "quiz",
        question: "How can you enforce that all connections to an S3 bucket use HTTPS?",
        options: ["Add a bucket policy that denies requests where aws:SecureTransport is false", "Enable SSE-S3 encryption on the bucket", "Set Block Public Access settings to block all public access", "Enable MFA delete on the bucket"],
        correctAnswer: "Add a bucket policy that denies requests where aws:SecureTransport is false",
      },
    ],
  },
  {
    lessonId: "s3_lesson_22",
    title: "S3 MFA Delete",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator", "cloud_security_engineer"],
    durationSeconds: 240,
    difficulty: "hard",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_11"],
    content: [
      {
        type: "text",
        text: "MFA Delete adds an additional layer of protection to prevent accidental or malicious deletion of S3 object versions. When MFA Delete is enabled on a versioning-enabled bucket:\n• Permanently deleting a specific object version requires a valid MFA token\n• Changing the versioning state of the bucket requires a valid MFA token\n• Only the bucket owner (root user) can enable/disable MFA Delete",
      },
      {
        type: "text",
        text: "Non-versioned deletes (creating a delete marker) do NOT require MFA — even in MFA-enabled buckets. MFA Delete can only be configured via the AWS CLI or API (not the console). It requires S3 Versioning to be enabled first.",
      },
      {
        type: "quiz",
        question: "Who is the only person who can enable MFA Delete on an S3 bucket?",
        options: ["The bucket owner using the root account credentials", "Any IAM administrator", "Any user with s3:PutBucketVersioning permission", "AWS Support"],
        correctAnswer: "The bucket owner using the root account credentials",
      },
    ],
  },
  {
    lessonId: "s3_lesson_23",
    title: "S3 Object Lock",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator", "cloud_engineer", "cloud_security_engineer"],
    durationSeconds: 360,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_22"],
    content: [
      {
        type: "text",
        text: "S3 Object Lock prevents objects from being deleted or overwritten for a fixed time period or indefinitely. It implements write-once-read-many (WORM) storage, which is required for regulatory compliance frameworks like SEC Rule 17a-4(f), FINRA, and HIPAA.\n\nObject Lock has two retention modes:\n1. Compliance mode – No user (including root) can delete or overwrite the object until the retention period expires. The retention period cannot be shortened.\n2. Governance mode – Most users cannot delete/overwrite the object, but users with special IAM permissions (s3:BypassGovernanceRetention) can override it.",
      },
      {
        type: "text",
        text: "There are two ways to apply Object Lock:\n1. Retention period – Specify a fixed date or duration. After this date, the object can be deleted normally.\n2. Legal hold – Prevents deletion indefinitely (no expiration date), until the legal hold is explicitly removed. Legal holds are independent of retention periods.\n\nObject Lock must be enabled at bucket creation time. Versioning is automatically enabled when Object Lock is enabled.",
      },
      {
        type: "quiz",
        question: "In which S3 Object Lock mode can a user with special permissions override the retention period?",
        options: ["Governance mode", "Compliance mode", "Legal hold mode", "Neither mode allows overrides"],
        correctAnswer: "Governance mode",
      },
      {
        type: "quiz",
        question: "What storage model does S3 Object Lock implement?",
        options: ["WORM (Write Once Read Many)", "RAID (Redundant Array of Independent Disks)", "FIFO (First In First Out)", "ACID (Atomicity, Consistency, Isolation, Durability)"],
        correctAnswer: "WORM (Write Once Read Many)",
      },
    ],
  },
  {
    lessonId: "s3_lesson_24",
    title: "IAM Access Analyzer for S3",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator", "cloud_security_engineer"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_12", "s3_lesson_13"],
    content: [
      {
        type: "text",
        text: "IAM Access Analyzer for S3 evaluates your bucket access policies and ACLs to identify buckets that are publicly accessible or accessible from outside your AWS organization. It provides an external access summary that lists all buckets with public or cross-account access and explains exactly what access is granted and why.",
      },
      {
        type: "text",
        text: "Access Analyzer for S3 works continuously and alerts you when a new policy change introduces unintended public or cross-account access. You can:\n• Review findings and mark them as 'archived' if intentional\n• Download a report of your bucket access configurations\n• Block all public access directly from the findings interface\n• Use it alongside Block Public Access as a defense-in-depth strategy",
      },
      {
        type: "quiz",
        question: "What is the primary purpose of IAM Access Analyzer for S3?",
        options: ["Identify buckets with unintended public or cross-account access", "Encrypt S3 buckets automatically", "Monitor S3 request performance", "Enable automatic replication of S3 buckets"],
        correctAnswer: "Identify buckets with unintended public or cross-account access",
      },
    ],
  },
  {
    lessonId: "s3_lesson_25",
    title: "S3 Requester Pays",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_administrator", "cloud_data_engineer"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 70,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_11"],
    content: [
      {
        type: "text",
        text: "Normally, the bucket owner pays for all storage and data transfer costs. With the Requester Pays feature, the requester (the person or application downloading the data) pays for data transfer and request costs — while the bucket owner continues to pay for storage.\n\nThis is useful when you want to share large datasets publicly (e.g., scientific datasets, genomics data) without bearing the full cost of all downloads.",
      },
      {
        type: "text",
        text: "Important constraints for Requester Pays buckets:\n• Requests must be authenticated (anonymous access is not allowed)\n• The requester must include the header x-amz-request-payer: requester in their requests\n• MFA (multi-factor authentication) is not supported\n• SOAP requests are not supported\n• Requester Pays cannot be used with BitTorrent",
      },
      {
        type: "quiz",
        question: "With S3 Requester Pays enabled, who pays for data transfer costs when someone downloads from the bucket?",
        options: ["The requester (person downloading the data)", "The bucket owner", "AWS covers the cost", "Both the requester and bucket owner split the cost"],
        correctAnswer: "The requester (person downloading the data)",
      },
    ],
  },

  // ============================================
  // S3 MODULE 3: STORAGE CLASSES (10 lessons)
  // ============================================
  {
    lessonId: "s3_lesson_26",
    title: "Introduction to S3 Storage Classes",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_data_engineer", "cloud_administrator", "cloud_engineer"],
    durationSeconds: 300,
    difficulty: "easy",
    xpReward: 60,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_2"],
    content: [
      {
        type: "text",
        text: "S3 offers a range of storage classes designed for different use cases, balancing cost, availability, retrieval time, and durability. Choosing the right storage class can dramatically reduce your S3 bill. You specify the storage class when you upload an object, and can change it later using Lifecycle rules or by copying the object.",
      },
      {
        type: "text",
        text: "S3 Storage Classes overview:\n• S3 Standard – Frequently accessed data. High availability (99.99%), 11 nines durability, low latency.\n• S3 Standard-IA – Infrequently accessed but needs rapid access. Lower storage cost, but per-GB retrieval fee.\n• S3 One Zone-IA – Like Standard-IA but stores data in a single AZ. Lower cost, less availability.\n• S3 Intelligent-Tiering – Automatically moves data between tiers based on access patterns. No retrieval fees.\n• S3 Express One Zone – Highest performance, single-digit millisecond latency. Uses directory buckets.\n• S3 Glacier Instant Retrieval – Archive with millisecond retrieval. Minimum storage duration: 90 days.\n• S3 Glacier Flexible Retrieval – Archive, retrieval in minutes to hours. Minimum 90 days.\n• S3 Glacier Deep Archive – Lowest cost, retrieval in 12 hours. Minimum 180 days.",
      },
      {
        type: "quiz",
        question: "Which storage class is best for data that you access regularly with no tolerance for retrieval delays?",
        options: ["S3 Standard", "S3 Glacier Flexible Retrieval", "S3 One Zone-IA", "S3 Standard-IA"],
        correctAnswer: "S3 Standard",
      },
    ],
  },
  {
    lessonId: "s3_lesson_27",
    title: "S3 Standard and S3 Standard-IA",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_data_engineer", "cloud_administrator", "cloud_engineer"],
    durationSeconds: 300,
    difficulty: "easy",
    xpReward: 60,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_26"],
    content: [
      {
        type: "text",
        text: "S3 Standard is the default storage class for frequently accessed data.\n• Availability: 99.99%\n• Durability: 99.999999999% (11 nines) across multiple AZs\n• No minimum storage duration or object size\n• No retrieval fee\n• Ideal for: active data, dynamic websites, content distribution, analytics\n\nS3 Standard-IA (Infrequent Access) is for data accessed less than once a month.\n• Same durability (11 nines) across multiple AZs\n• Lower storage cost per GB than Standard\n• Per-GB retrieval fee applies\n• Minimum storage duration: 30 days\n• Minimum object size: 128 KB (smaller objects are billed as 128 KB)\n• Ideal for: backups, disaster recovery data, long-lived but infrequently accessed files",
      },
      {
        type: "quiz",
        question: "What is the minimum storage duration for S3 Standard-IA?",
        options: ["30 days", "60 days", "90 days", "180 days"],
        correctAnswer: "30 days",
      },
      {
        type: "quiz",
        question: "What happens if you store an object smaller than 128 KB in S3 Standard-IA?",
        options: ["You are billed as if the object were 128 KB", "The object is automatically moved to S3 Standard", "You receive an error", "The object is stored free of charge"],
        correctAnswer: "You are billed as if the object were 128 KB",
      },
    ],
  },
  {
    lessonId: "s3_lesson_28",
    title: "S3 Intelligent-Tiering",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_data_engineer", "cloud_administrator"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_27"],
    content: [
      {
        type: "text",
        text: "S3 Intelligent-Tiering automatically moves objects between access tiers based on access patterns — with no performance impact and no retrieval fees. It's ideal when access patterns are unpredictable or change over time.",
      },
      {
        type: "text",
        text: "S3 Intelligent-Tiering has up to four tiers:\n1. Frequent Access tier – Default. Same performance as S3 Standard.\n2. Infrequent Access tier – After 30 consecutive days without access, objects are moved here. Lower cost.\n3. Archive Instant Access tier (opt-in) – After 90 days without access. Millisecond retrieval.\n4. Archive Access tier (opt-in) – After 90–730 days. Retrieval in hours.\n5. Deep Archive Access tier (opt-in) – After 180–730 days. Lowest cost, retrieval in hours.\n\nNo retrieval fees, but there's a small per-object monitoring fee. Not cost-effective for objects smaller than 128 KB.",
      },
      {
        type: "quiz",
        question: "What happens to an object in S3 Intelligent-Tiering if it is accessed after being in the Infrequent Access tier?",
        options: ["It moves back to the Frequent Access tier automatically", "It stays in the Infrequent Access tier permanently", "A retrieval fee is charged", "You must manually move it back to Frequent Access"],
        correctAnswer: "It moves back to the Frequent Access tier automatically",
      },
    ],
  },
  {
    lessonId: "s3_lesson_29",
    title: "S3 One Zone-IA",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_data_engineer", "cloud_administrator"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 70,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_27"],
    content: [
      {
        type: "text",
        text: "S3 One Zone-IA stores data in a single Availability Zone, making it less expensive than Standard-IA (which stores data across 3 AZs). The trade-off is that if the AZ is lost, the data is also lost.\n\n• Availability: 99.5% (lower than Standard-IA's 99.9%)\n• Durability: 99.999999999% within a single AZ\n• Same retrieval fees and minimum storage duration (30 days) as Standard-IA\n• Same minimum object size (128 KB) as Standard-IA",
      },
      {
        type: "quiz",
        question: "What is the main risk of using S3 One Zone-IA compared to S3 Standard-IA?",
        options: ["Data loss if the single Availability Zone fails", "Higher storage costs", "Slower retrieval times", "No support for encryption"],
        correctAnswer: "Data loss if the single Availability Zone fails",
      },
      {
        type: "text",
        text: "Best use cases for S3 One Zone-IA:\n• Secondary backups of on-premises data (where you have the primary copy elsewhere)\n• Data that can be recreated if lost (e.g., thumbnails, transcoded media)\n• Cross-region replication destination (since the source bucket already has multi-AZ durability)\n• Data requiring infrequent access and for which cost is prioritized over availability",
      },
    ],
  },
  {
    lessonId: "s3_lesson_30",
    title: "S3 Glacier Storage Classes",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_data_engineer", "cloud_administrator"],
    durationSeconds: 360,
    difficulty: "medium",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_26"],
    content: [
      {
        type: "text",
        text: "S3 Glacier classes are designed for rarely accessed data (archives). There are three Glacier tiers:\n\n1. S3 Glacier Instant Retrieval\n   • Millisecond retrieval (same as Standard)\n   • Lower storage cost than Standard-IA\n   • Per-retrieval fee applies\n   • Minimum storage: 90 days\n   • Best for: Medical images, news media assets, rarely accessed user-generated content\n\n2. S3 Glacier Flexible Retrieval (formerly just 'S3 Glacier')\n   • Retrieval options: Expedited (1–5 min), Standard (3–5 hrs), Bulk (5–12 hrs)\n   • Much lower storage cost\n   • Minimum storage: 90 days\n   • Best for: Backup archives, disaster recovery, long-term media archives\n\n3. S3 Glacier Deep Archive\n   • Lowest cost storage in S3\n   • Retrieval: Standard (12 hrs), Bulk (48 hrs)\n   • Minimum storage: 180 days\n   • Best for: Compliance archives, financial records, healthcare records",
      },
      {
        type: "quiz",
        question: "Which S3 Glacier tier offers millisecond retrieval, similar to standard S3 classes?",
        options: ["S3 Glacier Instant Retrieval", "S3 Glacier Flexible Retrieval", "S3 Glacier Deep Archive", "S3 Standard-IA"],
        correctAnswer: "S3 Glacier Instant Retrieval",
      },
      {
        type: "quiz",
        question: "What is the minimum storage duration for S3 Glacier Deep Archive?",
        options: ["180 days", "90 days", "30 days", "365 days"],
        correctAnswer: "180 days",
      },
    ],
  },
  {
    lessonId: "s3_lesson_31",
    title: "S3 Express One Zone: High-Performance Storage",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_data_engineer", "software_development_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_26"],
    content: [
      {
        type: "text",
        text: "S3 Express One Zone is the highest-performance S3 storage class, designed for latency-sensitive workloads. It uses directory buckets and provides:\n• Single-digit millisecond latency (up to 10x faster than S3 Standard)\n• 50% lower request costs compared to S3 Standard\n• Data stored redundantly across multiple devices within a SINGLE Availability Zone\n• Designed for 99.95% availability within a single AZ",
      },
      {
        type: "text",
        text: "S3 Express One Zone is optimized for:\n• Machine learning training jobs (Amazon SageMaker, Amazon EMR)\n• Analytics workloads (Amazon Athena)\n• Video editing workflows\n• High-frequency trading and financial data processing\n• Any application needing consistent sub-millisecond latency\n\nKey difference: S3 Express One Zone uses a session-based authentication model (CreateSession) for low-latency object operations, unlike the per-request signing used by other S3 classes. Session tokens expire after 5 minutes.",
      },
      {
        type: "quiz",
        question: "How much faster can S3 Express One Zone be compared to S3 Standard?",
        options: ["Up to 10x faster", "Up to 2x faster", "Up to 5x faster", "Up to 100x faster"],
        correctAnswer: "Up to 10x faster",
      },
    ],
  },
  {
    lessonId: "s3_lesson_32",
    title: "Storage Class Analysis",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator", "cloud_data_engineer"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 70,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_26"],
    content: [
      {
        type: "text",
        text: "Storage Class Analysis helps you analyze storage access patterns to determine when it's appropriate to move objects to a more cost-effective storage class. It observes object access patterns over 30–90 days and produces daily analysis reports in CSV format that you can view in the S3 console or export to a bucket.\n\nStorage Class Analysis is configured at the bucket level and can be filtered by prefix or object tag. It is particularly useful for identifying objects in S3 Standard that are good candidates for transition to S3 Standard-IA.",
      },
      {
        type: "quiz",
        question: "What is the primary purpose of S3 Storage Class Analysis?",
        options: ["Identify objects that can be transitioned to a cheaper storage class based on access patterns", "Automatically move objects between storage classes", "Encrypt objects in different storage classes", "Monitor S3 request latency"],
        correctAnswer: "Identify objects that can be transitioned to a cheaper storage class based on access patterns",
      },
    ],
  },
  {
    lessonId: "s3_lesson_33",
    title: "Comparing S3 Storage Classes",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_data_engineer", "cloud_administrator"],
    durationSeconds: 360,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_30", "s3_lesson_28"],
    content: [
      {
        type: "text",
        text: "A quick comparison of the key S3 storage class dimensions:\n\n| Class | Availability | Min Duration | Retrieval Fee | Retrieval Time |\n|---|---|---|---|---|\n| Standard | 99.99% | None | No | Milliseconds |\n| Express One Zone | 99.95% | None | No | <1 ms |\n| Standard-IA | 99.9% | 30 days | Yes | Milliseconds |\n| One Zone-IA | 99.5% | 30 days | Yes | Milliseconds |\n| Intelligent-Tiering | 99.9%–99% | None | No | Milliseconds–hours |\n| Glacier Instant | 99.9% | 90 days | Yes | Milliseconds |\n| Glacier Flexible | 99.99% | 90 days | Yes | Minutes–hours |\n| Glacier Deep Archive | 99.99% | 180 days | Yes | Hours |",
      },
      {
        type: "quiz",
        question: "Which storage class has NO minimum storage duration AND charges no retrieval fee?",
        options: ["S3 Standard", "S3 Glacier Flexible Retrieval", "S3 Standard-IA", "S3 Glacier Instant Retrieval"],
        correctAnswer: "S3 Standard",
      },
      {
        type: "quiz",
        question: "You store a 1 GB file in S3 Glacier Deep Archive and delete it after 60 days. How many days will you be billed for?",
        options: ["180 days (the minimum storage duration)", "60 days (actual storage time)", "90 days", "120 days"],
        correctAnswer: "180 days (the minimum storage duration)",
      },
    ],
  },
  {
    lessonId: "s3_lesson_34",
    title: "Restoring Archived Objects",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator", "cloud_data_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_30"],
    content: [
      {
        type: "text",
        text: "To access an object archived in S3 Glacier Flexible Retrieval or Glacier Deep Archive, you must initiate a restore operation. The restore creates a temporary copy of the object in S3 Standard for a specified number of days (1 to 30 days).\n\nFor Glacier Flexible Retrieval, three retrieval tiers are available:\n• Expedited: 1–5 minutes. Higher cost. Good for occasional urgent access.\n• Standard: 3–5 hours. Moderate cost. Default tier.\n• Bulk: 5–12 hours. Lowest cost. For large amounts of data.",
      },
      {
        type: "text",
        text: "For Glacier Deep Archive:\n• Standard: Up to 12 hours retrieval time.\n• Bulk: Up to 48 hours retrieval time.\n\nS3 Glacier Instant Retrieval does NOT require a restore operation — objects are accessible immediately (milliseconds) just like Standard objects, but with a higher per-retrieval cost.\n\nYou can also use S3 Batch Operations to restore large numbers of archived objects at once.",
      },
      {
        type: "quiz",
        question: "Which S3 Glacier tier does NOT require a separate restore operation before you can access the object?",
        options: ["S3 Glacier Instant Retrieval", "S3 Glacier Flexible Retrieval", "S3 Glacier Deep Archive", "All Glacier tiers require restoration"],
        correctAnswer: "S3 Glacier Instant Retrieval",
      },
    ],
  },
  {
    lessonId: "s3_lesson_35",
    title: "Setting the Storage Class of an Object",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "software_development_engineer", "cloud_administrator", "cloud_engineer"],
    durationSeconds: 240,
    difficulty: "easy",
    xpReward: 60,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_26"],
    content: [
      {
        type: "text",
        text: "You can set or change the storage class of an object in several ways:\n1. At upload time – Specify the storage class in the PUT request header (x-amz-storage-class)\n2. Using the console – Select the storage class in the upload wizard or edit object properties\n3. Using Lifecycle rules – Automatically transition objects based on age or tags\n4. Copying the object – Use CopyObject and specify a new storage class\n\nNote: You cannot directly change an object's storage class in-place. Transitioning an object means S3 creates a new copy of the object in the new class and removes the old one.",
      },
      {
        type: "code",
        text: `// AWS CLI: Upload with a specific storage class
aws s3 cp myfile.txt s3://my-bucket/myfile.txt \\
  --storage-class STANDARD_IA

// AWS CLI: Change storage class by copying
aws s3 cp s3://my-bucket/myfile.txt s3://my-bucket/myfile.txt \\
  --storage-class GLACIER_IR

// Valid storage class values:
// STANDARD, REDUCED_REDUNDANCY, STANDARD_IA, 
// ONEZONE_IA, INTELLIGENT_TIERING, GLACIER,
// DEEP_ARCHIVE, GLACIER_IR, EXPRESS_ONEZONE`,
      },
      {
        type: "quiz",
        question: "How do you change the storage class of an existing S3 object?",
        options: ["Copy the object to itself specifying the new storage class", "Modify the object's metadata directly", "Use the s3:ChangeStorageClass API call", "Delete and re-upload the object"],
        correctAnswer: "Copy the object to itself specifying the new storage class",
      },
    ],
  },

  // ============================================
  // S3 MODULE 4: DATA MANAGEMENT (15 lessons)
  // ============================================
  {
    lessonId: "s3_lesson_36",
    title: "Uploading Objects to S3",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "software_development_engineer", "cloud_administrator", "cloud_engineer", "cloud_devops_engineer"],
    durationSeconds: 300,
    difficulty: "easy",
    xpReward: 60,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_3"],
    content: [
      {
        type: "text",
        text: "You can upload objects to S3 using:\n• The S3 console (up to 160 GB per object via browser)\n• AWS CLI: `aws s3 cp localfile.txt s3://my-bucket/`\n• AWS SDKs: Using PutObject for single-part uploads\n• S3 REST API: HTTP PUT request directly to the object URL\n• Multipart Upload API: For large objects (recommended for objects > 100 MB)\n\nS3 supports objects up to 5 TB in size. Objects larger than 5 GB must use multipart upload.",
      },
      {
        type: "quiz",
        question: "What is the maximum size of a single S3 object?",
        options: ["5 TB", "5 GB", "100 GB", "1 TB"],
        correctAnswer: "5 TB",
      },
      {
        type: "text",
        text: "Best practices for uploading:\n• Objects larger than 100 MB: Use Multipart Upload for better throughput and resilience\n• Objects larger than 5 GB: MUST use Multipart Upload\n• For users uploading from remote locations: Enable Transfer Acceleration\n• To verify integrity: Always use checksums (CRC32, CRC32C, SHA-1, SHA-256)\n• To prevent overwriting: Use conditional writes with If-None-Match header",
      },
    ],
  },
  {
    lessonId: "s3_lesson_37",
    title: "Multipart Upload",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "software_development_engineer", "cloud_engineer"],
    durationSeconds: 360,
    difficulty: "medium",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_36"],
    content: [
      {
        type: "text",
        text: "Multipart Upload allows you to upload a single object as a set of parts. Each part is uploaded independently and in any order. Once all parts are uploaded, S3 assembles them into the final object. Key benefits:\n• Upload large objects in parallel (increasing throughput)\n• Recover from network failures by only retransmitting failed parts\n• Begin uploading before you know the total object size (streaming scenarios)\n• Required for objects larger than 5 GB",
      },
      {
        type: "text",
        text: "The multipart upload process has three steps:\n1. Initiate – Call CreateMultipartUpload to get an Upload ID\n2. Upload Parts – Upload each part with UploadPart, specifying the Upload ID and part number (1–10,000)\n3. Complete – Call CompleteMultipartUpload with the Upload ID and a list of part ETags\n\nIf something goes wrong, call AbortMultipartUpload to clean up incomplete parts. Unfinished multipart uploads incur storage charges, so set up S3 Lifecycle rules to automatically abort them after a set number of days.",
      },
      {
        type: "quiz",
        question: "What must you do if a multipart upload fails partway through to avoid ongoing storage charges?",
        options: ["Call AbortMultipartUpload to clean up the incomplete parts", "Simply start a new multipart upload", "Delete the entire bucket and try again", "Nothing — S3 automatically cleans up failed uploads"],
        correctAnswer: "Call AbortMultipartUpload to clean up the incomplete parts",
      },
      {
        type: "quiz",
        question: "What is the maximum number of parts in a multipart upload?",
        options: ["10,000 parts", "1,000 parts", "100 parts", "Unlimited parts"],
        correctAnswer: "10,000 parts",
      },
    ],
  },
  {
    lessonId: "s3_lesson_38",
    title: "Downloading Objects from S3",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "software_development_engineer", "cloud_administrator", "cloud_engineer"],
    durationSeconds: 240,
    difficulty: "easy",
    xpReward: 60,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_36"],
    content: [
      {
        type: "text",
        text: "You can download objects from S3 in several ways:\n• S3 console – Click an object and choose Download\n• AWS CLI: `aws s3 cp s3://my-bucket/file.txt .`\n• AWS SDKs: Using GetObject API call\n• Presigned URL: A time-limited URL that allows download without AWS credentials\n• S3 REST API: HTTP GET request\n\nFor large objects, you can download specific byte ranges using the Range header, which enables parallel download of different sections (byte-range fetches).",
      },
      {
        type: "text",
        text: "Byte-range fetches allow you to:\n• Download only the first part of an object to determine its content (e.g., read file headers)\n• Split large downloads into parallel streams for higher throughput\n• Resume an interrupted download from where it left off\n\nFor archived objects (Glacier Flexible Retrieval, Glacier Deep Archive), you must initiate a restore operation before downloading. The restore creates a temporary copy in S3 Standard.",
      },
      {
        type: "quiz",
        question: "What technique allows you to download different sections of a large S3 object in parallel for higher throughput?",
        options: ["Byte-range fetches using the Range header", "S3 Transfer Acceleration", "Multipart Download API", "S3 Express One Zone"],
        correctAnswer: "Byte-range fetches using the Range header",
      },
    ],
  },
  {
    lessonId: "s3_lesson_39",
    title: "Copying, Moving, and Renaming Objects",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "software_development_engineer", "cloud_administrator", "cloud_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 70,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_36"],
    content: [
      {
        type: "text",
        text: "S3 does not have a native 'move' or 'rename' operation. To move or rename an object:\n1. Copy the object to the new location/name using CopyObject\n2. Delete the original object using DeleteObject\n\nCopyObject works for objects up to 5 GB. For larger objects, use multipart upload to copy in parts.\n\nNote: S3 does NOT support atomic rename/move. If the copy succeeds but the delete fails, you'll have two copies.",
      },
      {
        type: "text",
        text: "CopyObject can also be used for:\n• Changing the storage class of an object (copy to itself with a new storage class)\n• Changing an object's metadata (copy to itself with new metadata values)\n• Moving objects between buckets in the same or different Regions\n• Changing an object's encryption settings\n\nFor bulk moves or copies of millions of objects, use S3 Batch Operations, which can perform CopyObject at scale with a single API request.",
      },
      {
        type: "quiz",
        question: "Amazon S3 doesn't support renaming objects natively. What is the correct way to rename an S3 object?",
        options: ["Copy the object to a new key, then delete the original", "Use the RenameObject API", "Use AWS CLI s3 mv command (which performs copy + delete)", "Modify the key in the object's metadata"],
        correctAnswer: "Copy the object to a new key, then delete the original",
      },
    ],
  },
  {
    lessonId: "s3_lesson_40",
    title: "Deleting S3 Objects",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "software_development_engineer", "cloud_administrator", "cloud_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 70,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_36"],
    content: [
      {
        type: "text",
        text: "S3 provides two delete APIs:\n• DeleteObject – Deletes a single object per request\n• DeleteObjects (Multi-Object Delete) – Delete up to 1,000 objects in a single HTTP request\n\nBest practices before deleting:\n1. Enable Versioning – Creates a delete marker instead of permanently deleting\n2. Use Lifecycle rules – For automatic, time-based deletion of logs or expired data\n3. Restrict permissions – Explicitly deny s3:DeleteObject, s3:DeleteObjectVersion, and s3:PutLifecycleConfiguration to prevent accidental deletion\n4. Use S3 Replication – Maintain a copy in another bucket or Region",
      },
      {
        type: "text",
        text: "Behavior differences by bucket type:\n• Unversioned bucket: DeleteObject permanently deletes the object\n• Versioned bucket (non-versioned delete): Creates a delete marker; object still exists as a prior version\n• Versioned bucket (versioned delete with version ID): Permanently deletes that specific version\n• MFA-enabled bucket: Versioned deletes require a valid MFA token",
      },
      {
        type: "quiz",
        question: "What happens when you delete an object from a versioning-enabled bucket WITHOUT specifying a version ID?",
        options: ["A delete marker is created; the object is not permanently deleted", "The object and all its versions are permanently deleted", "The most recent version is permanently deleted", "An error is returned"],
        correctAnswer: "A delete marker is created; the object is not permanently deleted",
      },
    ],
  },
  {
    lessonId: "s3_lesson_41",
    title: "S3 Versioning",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_administrator", "cloud_engineer", "cloud_devops_engineer"],
    durationSeconds: 360,
    difficulty: "medium",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_40"],
    content: [
      {
        type: "text",
        text: "S3 Versioning allows you to keep multiple versions of the same object in a bucket. Once enabled, S3 assigns a unique version ID to each uploaded object. This protects against accidental deletions and overwrites.\n\nVersioning states:\n• Unversioned (default) – No versioning. Overwrites replace the object permanently.\n• Versioning-Enabled – S3 keeps all versions. Deletions create a delete marker.\n• Versioning-Suspended – New uploads get version ID 'null'. Existing versions are preserved.",
      },
      {
        type: "text",
        text: "Key versioning behaviors:\n• Enabling versioning on a bucket affects only new objects. Existing objects get version ID 'null'.\n• Once enabled, versioning can be suspended but NOT disabled.\n• When you delete a versioned object, a delete marker is added as the current version.\n• To permanently delete a specific version, provide the version ID in the delete request.\n• To restore an accidentally deleted object, delete the delete marker.\n\nAWS recommends waiting 15 minutes after enabling versioning before writing to the bucket.",
      },
      {
        type: "quiz",
        question: "Once S3 Versioning is enabled on a bucket, can it be completely disabled?",
        options: ["No, it can only be suspended, not disabled", "Yes, by calling PutBucketVersioning with Status: Disabled", "Yes, but only if the bucket is empty", "Yes, through the AWS console bucket settings"],
        correctAnswer: "No, it can only be suspended, not disabled",
      },
      {
        type: "quiz",
        question: "How do you restore an accidentally deleted object in a versioning-enabled bucket?",
        options: ["Delete the delete marker that was created when the object was deleted", "Re-upload the object with the same key", "Call RestoreObject with the original version ID", "Use S3 Replication to restore from another Region"],
        correctAnswer: "Delete the delete marker that was created when the object was deleted",
      },
    ],
  },
  {
    lessonId: "s3_lesson_42",
    title: "Organizing Objects: Prefixes and Folders",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "software_development_engineer", "cloud_administrator", "cloud_engineer"],
    durationSeconds: 240,
    difficulty: "easy",
    xpReward: 60,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_3"],
    content: [
      {
        type: "text",
        text: "S3 is a flat object store — there is no true folder hierarchy. Instead, 'folders' are simulated using key name prefixes with the slash (/) delimiter. For example, the key 'photos/2024/vacation.jpg' appears in the console as if it's inside a 'photos/2024/' folder, but it's just a key with slashes in its name.\n\nWhen listing objects, you can use a prefix and delimiter to simulate folder navigation. For example, listing with prefix='photos/' and delimiter='/' returns:\n• CommonPrefixes (virtual folders): photos/2024/, photos/2023/\n• Objects directly in 'photos/': any objects without a further delimiter",
      },
      {
        type: "quiz",
        question: "In S3, what is a 'folder' really?",
        options: ["A key name prefix using the / delimiter — S3 has no real folder hierarchy", "A separate S3 resource similar to a bucket", "A collection of objects with a common tag", "A virtual partition within a bucket"],
        correctAnswer: "A key name prefix using the / delimiter — S3 has no real folder hierarchy",
      },
    ],
  },
  {
    lessonId: "s3_lesson_43",
    title: "Object Tagging",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_data_engineer", "cloud_administrator", "cloud_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 70,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_3"],
    content: [
      {
        type: "text",
        text: "Object tags are key-value pairs that you can assign to S3 objects. They enable fine-grained access control, cost allocation, and Lifecycle rule filtering.\n\nObject tag constraints:\n• Maximum 10 tags per object\n• Tag keys: up to 128 Unicode characters\n• Tag values: up to 256 Unicode characters\n• Keys are case-sensitive: 'Project' ≠ 'project'\n• Tags prefixed with 'aws:' are reserved for AWS use",
      },
      {
        type: "text",
        text: "Use cases for object tags:\n• Cost allocation – Apply 'CostCenter' or 'Project' tags, then filter billing reports\n• Access control – Use tags in IAM or bucket policies as conditions (ABAC: Attribute-Based Access Control)\n• Lifecycle rules – Transition or expire objects based on tags\n• Custom workflows – Trigger Lambda functions based on tag values\n\nYou can add, update, or delete tags on an existing object without copying it (unlike user-defined metadata).",
      },
      {
        type: "quiz",
        question: "What is the maximum number of tags you can apply to a single S3 object?",
        options: ["10 tags", "5 tags", "50 tags", "Unlimited tags"],
        correctAnswer: "10 tags",
      },
      {
        type: "quiz",
        question: "Unlike user-defined metadata, can you update object tags without copying the object?",
        options: ["Yes, tags can be added or updated directly using the PutObjectTagging API", "No, you must copy the object to change tags", "Yes, but only through the S3 console", "No, tags are immutable after object creation"],
        correctAnswer: "Yes, tags can be added or updated directly using the PutObjectTagging API",
      },
    ],
  },
  {
    lessonId: "s3_lesson_44",
    title: "S3 Transfer Acceleration",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "software_development_engineer", "cloud_administrator", "cloud_engineer"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_36"],
    content: [
      {
        type: "text",
        text: "S3 Transfer Acceleration speeds up uploads to S3 for clients geographically distant from the S3 bucket's Region. It routes uploads through Amazon CloudFront's globally distributed edge locations using optimized network paths.\n\nHow it works:\n1. Client uploads to the nearest CloudFront edge location using a special Transfer Acceleration endpoint (e.g., bucket-name.s3-accelerate.amazonaws.com)\n2. CloudFront routes data through Amazon's optimized backbone network to the S3 bucket's Region\n3. Data arrives in the destination bucket faster than going over the public internet",
      },
      {
        type: "quiz",
        question: "What is the primary use case for S3 Transfer Acceleration?",
        options: ["Speeding up uploads for users geographically far from the S3 bucket's Region", "Reducing S3 storage costs", "Improving read performance for frequently accessed objects", "Encrypting data during transfer"],
        correctAnswer: "Speeding up uploads for users geographically far from the S3 bucket's Region",
      },
      {
        type: "text",
        text: "Requirements for Transfer Acceleration:\n• The bucket name must be DNS-compatible (no dots in the name)\n• S3 Transfer Acceleration must be enabled on the bucket\n• Use the accelerate endpoint: {bucket}.s3-accelerate.amazonaws.com\n• There is an additional cost for using Transfer Acceleration\n• AWS provides a Speed Comparison tool at s3-accelerate-speedtest.s3-accelerate.amazonaws.com to compare accelerated vs standard speeds before enabling",
      },
    ],
  },
  {
    lessonId: "s3_lesson_45",
    title: "Checking Object Integrity with Checksums",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "software_development_engineer", "cloud_data_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_36"],
    content: [
      {
        type: "text",
        text: "S3 supports multiple checksum algorithms to verify data integrity during uploads, downloads, and at rest. Available algorithms:\n• CRC32 – Fast, 32-bit cyclic redundancy check\n• CRC32C – CRC variant optimized for hardware acceleration (recommended for performance)\n• CRC64NVME – 64-bit CRC, supported in S3 Express One Zone\n• SHA-1 – Secure Hash Algorithm 1 (160-bit)\n• SHA-256 – Secure Hash Algorithm 256 (256-bit, strongest of the options)\n• MD5 – Legacy, automatically computed for non-multipart, non-SSE-S3 objects (not available for Express One Zone)",
      },
      {
        type: "text",
        text: "How integrity checking works:\n• Upload: Provide a checksum in the request header. S3 computes and compares. If mismatch, upload fails.\n• Download: Request the checksum in the response. Compare with locally computed checksum.\n• At rest: Use S3 Batch Operations (Compute Checksum) to calculate and store checksums for existing objects.\n\nChecksums are stored as part of the object's metadata. For SSE-encrypted objects, checksums are stored in encrypted form.",
      },
      {
        type: "quiz",
        question: "Which checksum algorithm is NOT supported in S3 Express One Zone (directory buckets)?",
        options: ["MD5", "CRC32", "CRC64NVME", "SHA-256"],
        correctAnswer: "MD5",
      },
    ],
  },
  {
    lessonId: "s3_lesson_46",
    title: "Conditional Requests in S3",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "software_development_engineer"],
    durationSeconds: 300,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_36", "s3_lesson_5"],
    content: [
      {
        type: "text",
        text: "S3 supports conditional requests that execute only if a specified condition is met, preventing race conditions and unintended overwrites. Conditional headers work with object ETags:\n\n• If-Match – Retrieve/delete only if the ETag matches (specific version check)\n• If-None-Match – Write only if no object with this ETag exists (prevent overwrite)\n• If-Modified-Since – Retrieve only if modified after this date\n• If-Unmodified-Since – Retrieve only if NOT modified since this date",
      },
      {
        type: "text",
        text: "Common use cases:\n• Preventing duplicate uploads: Use If-None-Match to upload only if the key doesn't exist\n• Safe updates (optimistic locking): Read an object, note its ETag, then write back with If-Match to ensure it hasn't changed since you read it\n• Conditional deletes: Use a bucket policy with ETag conditions to prevent deleting specific versions\n\nConditional writes on PutObject are supported in S3 general purpose buckets, enabling optimistic locking without building custom coordination logic.",
      },
      {
        type: "quiz",
        question: "Which conditional header should you use to upload an object ONLY if no object with that key already exists?",
        options: ["If-None-Match: *", "If-Match: *", "If-Modified-Since: <date>", "x-amz-conditional: create-only"],
        correctAnswer: "If-None-Match: *",
      },
    ],
  },
  {
    lessonId: "s3_lesson_47",
    title: "S3 Batch Operations",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_data_engineer", "cloud_administrator", "cloud_devops_engineer"],
    durationSeconds: 360,
    difficulty: "medium",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_39", "s3_lesson_40"],
    content: [
      {
        type: "text",
        text: "S3 Batch Operations allows you to perform large-scale operations on billions of objects with a single request. You provide a manifest (a list of objects from S3 Inventory or a custom CSV), and S3 runs the specified operation on each object.\n\nSupported operations:\n• Copy objects (between buckets or storage classes)\n• Replace all object tags\n• Delete all object tags\n• Replace object ACLs\n• Restore objects from Glacier\n• Invoke an AWS Lambda function per object\n• Compute checksums\n• Update server-side encryption\n• Apply S3 Object Lock retention or legal hold\n• Replicate existing objects (Batch Replication)",
      },
      {
        type: "text",
        text: "S3 Batch Operations job lifecycle:\nNew → Preparing → Ready/Suspended → Active → Paused (if higher-priority job runs) → Completing → Complete\n\nJobs also have: Cancelling → Cancelled and Failing → Failed states.\n\nYou can assign a numeric priority to jobs (higher numbers run first). Priority changes can be made while a job is running. Completion reports are generated with per-object results.",
      },
      {
        type: "quiz",
        question: "What does S3 Batch Operations use to identify which objects to operate on?",
        options: ["A manifest file (S3 Inventory or custom CSV)", "Object tags", "Bucket prefix filters", "CloudTrail logs"],
        correctAnswer: "A manifest file (S3 Inventory or custom CSV)",
      },
      {
        type: "quiz",
        question: "In S3 Batch Operations job priority, which job runs first?",
        options: ["The job with the higher numeric priority value", "The job with the lower numeric priority value", "The oldest job always runs first", "Jobs run in the order they were submitted"],
        correctAnswer: "The job with the higher numeric priority value",
      },
    ],
  },
  {
    lessonId: "s3_lesson_48",
    title: "S3 Inventory",
    service: "s3",
    roles: ["solutions_architect", "cloud_data_engineer", "cloud_administrator"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_42"],
    content: [
      {
        type: "text",
        text: "S3 Inventory provides scheduled reports of your bucket's objects and their metadata, without requiring per-object API calls. Inventory reports can be generated daily or weekly and exported to CSV, Apache ORC, or Apache Parquet format.\n\nEach inventory report includes metadata fields like:\n• Object key, size, last modified date\n• Storage class, ETag\n• Replication status, encryption status\n• Object Lock mode and retain-until date\n• Multipart upload status\n• Checksum algorithms",
      },
      {
        type: "quiz",
        question: "What is a primary use case for S3 Inventory?",
        options: ["Auditing and reporting on objects and their metadata at scale without per-object API calls", "Monitoring S3 access patterns in real-time", "Automatically deleting old objects", "Providing a web interface for bucket management"],
        correctAnswer: "Auditing and reporting on objects and their metadata at scale without per-object API calls",
      },
      {
        type: "text",
        text: "S3 Inventory is particularly useful as a manifest source for S3 Batch Operations. Instead of generating a custom CSV, you can point Batch Operations to an Inventory report. You can also query Inventory reports using Amazon Athena for ad-hoc SQL analysis of your S3 object metadata.",
      },
    ],
  },
  {
    lessonId: "s3_lesson_49",
    title: "S3 Metadata Tables (S3 Metadata)",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_data_engineer"],
    durationSeconds: 300,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_48"],
    content: [
      {
        type: "text",
        text: "S3 Metadata automatically captures metadata for objects in your general purpose buckets and stores it in read-only Apache Iceberg tables (called metadata tables) in S3 Table Buckets. These tables are continuously refreshed as objects are added, updated, or deleted.\n\nMetadata tables contain:\n• System metadata: object key, size, storage class, creation time, ETag\n• User-defined metadata: tags and custom metadata from upload\n• Event metadata: who made changes and when\n\nYou can query metadata tables using Amazon Athena, Amazon Redshift, and Apache Spark for data discovery, ML training dataset preparation, and business analytics.",
      },
      {
        type: "quiz",
        question: "What data format does S3 Metadata use to store metadata tables?",
        options: ["Apache Iceberg format in S3 Table Buckets", "CSV files in the source bucket", "JSON documents in DynamoDB", "Relational tables in Amazon RDS"],
        correctAnswer: "Apache Iceberg format in S3 Table Buckets",
      },
    ],
  },
  {
    lessonId: "s3_lesson_50",
    title: "S3 CORS (Cross-Origin Resource Sharing)",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "software_development_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_11"],
    content: [
      {
        type: "text",
        text: "CORS (Cross-Origin Resource Sharing) allows web applications running in one domain to access resources in an S3 bucket in a different domain. Without CORS configuration, browsers block cross-origin requests.\n\nExample: A web application hosted at www.example.com needs to load images directly from photos.s3.amazonaws.com. Without a CORS policy on the S3 bucket, the browser blocks this request.",
      },
      {
        type: "code",
        text: `// Example S3 CORS configuration (JSON)
[
  {
    "AllowedOrigins": ["https://www.example.com"],
    "AllowedMethods": ["GET", "PUT"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]

// AllowedOrigins: Domains allowed to make cross-origin requests
// AllowedMethods: HTTP methods allowed (GET, PUT, POST, DELETE, HEAD)
// AllowedHeaders: Request headers allowed
// ExposeHeaders: Response headers the browser can access
// MaxAgeSeconds: How long browser caches the preflight response`,
      },
      {
        type: "quiz",
        question: "Why would you need to configure CORS on an S3 bucket?",
        options: ["To allow a web application in one domain to access S3 objects from a different domain", "To enable cross-region replication", "To allow cross-account access to the bucket", "To enable server-side encryption"],
        correctAnswer: "To allow a web application in one domain to access S3 objects from a different domain",
      },
    ],
  },

  // ============================================
  // S3 MODULE 5: BUCKET TYPES & ADVANCED FEATURES (10 lessons)
  // ============================================
  {
    lessonId: "s3_lesson_51",
    title: "Directory Buckets and S3 Express One Zone Deep Dive",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_data_engineer", "software_development_engineer"],
    durationSeconds: 360,
    difficulty: "hard",
    xpReward: 110,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_4", "s3_lesson_31"],
    content: [
      {
        type: "text",
        text: "Directory buckets differ from general purpose buckets in several key ways:\n• Objects are organized hierarchically (like a filesystem) using directories (prefixes)\n• There are no prefix limits; individual directories can scale horizontally\n• All public access is disabled by default and CANNOT be changed\n• ACLs are not supported; access control uses IAM only\n• There is no cross-account bucket-level access; only the bucket owner can manage the bucket\n• Server access logs are NOT supported",
      },
      {
        type: "text",
        text: "S3 Express One Zone uses TWO types of endpoints:\n1. Regional endpoints – For bucket-management operations (CreateBucket, DeleteBucket, PutBucketPolicy). These use standard IAM authentication.\n2. Zonal endpoints – For object operations (PutObject, GetObject, DeleteObject). These use session-based authentication via CreateSession.\n\nSession tokens from CreateSession are scoped to a specific directory bucket and expire every 5 minutes. The AWS SDKs handle session management automatically.",
      },
      {
        type: "quiz",
        question: "In S3 Express One Zone, what authentication mechanism is used for object-level operations?",
        options: ["Session-based authentication via CreateSession (with 5-minute token expiry)", "Standard per-request SigV4 signing", "API key-based authentication", "OAuth 2.0 tokens"],
        correctAnswer: "Session-based authentication via CreateSession (with 5-minute token expiry)",
      },
    ],
  },
  {
    lessonId: "s3_lesson_52",
    title: "Directory Bucket Naming Rules",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_administrator"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 70,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_51"],
    content: [
      {
        type: "text",
        text: "Directory bucket names follow different rules from general purpose buckets:\n• Must end with --{az-id}--x-s3 (e.g., my-bucket--usw2-az1--x-s3)\n• The --{az-id}--x-s3 suffix includes the Availability Zone ID (not the AZ name)\n• Length: 3–63 characters (excluding the suffix)\n• Only lowercase letters, numbers, and hyphens\n• Must begin and end with a letter or number\n• Directory bucket names are unique within a single AWS account and Region (NOT globally unique like general purpose buckets)\n\nExample: my-data--usw2-az1--x-s3 creates a directory bucket in the US West 2 region, AZ 'usw2-az1'.",
      },
      {
        type: "quiz",
        question: "What suffix is required in an S3 directory bucket name?",
        options: ["--{az-id}--x-s3 (e.g., --usw2-az1--x-s3)", "--dir (e.g., my-bucket--dir)", "--express (e.g., my-bucket--express)", "--{region-code} (e.g., --us-west-2)"],
        correctAnswer: "--{az-id}--x-s3 (e.g., --usw2-az1--x-s3)",
      },
    ],
  },
  {
    lessonId: "s3_lesson_53",
    title: "S3 Table Buckets and Apache Iceberg",
    service: "s3",
    roles: ["solutions_architect", "cloud_data_engineer", "application_architect"],
    durationSeconds: 360,
    difficulty: "hard",
    xpReward: 110,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_4"],
    content: [
      {
        type: "text",
        text: "S3 Table Buckets are optimized for storing tabular data in the Apache Iceberg format. They provide several benefits for analytics workloads:\n• Automatic table maintenance (compaction, snapshot management, orphan file removal)\n• Continuous optimization to improve query performance\n• Intelligent-Tiering support to reduce storage costs for older data\n• Integration with AWS analytics services: Amazon Athena, Redshift, EMR, SageMaker\n\nTable buckets are organized with namespaces (like database schemas) that contain tables. By default, you can create up to 10 table buckets per account per Region, with up to 10,000 tables per table bucket.",
      },
      {
        type: "text",
        text: "Apache Iceberg is an open table format that provides:\n• ACID transactions (Atomicity, Consistency, Isolation, Durability) for table reads and writes\n• Time travel: query historical snapshots of your data\n• Schema evolution: add, drop, rename, or update columns without rewriting data\n• Partition evolution: change partition strategies without rewriting historical data\n• Incremental ingestion from streaming sources like Amazon Data Firehose",
      },
      {
        type: "quiz",
        question: "What open table format does S3 Table Buckets use for storing tabular data?",
        options: ["Apache Iceberg", "Apache Parquet", "Apache ORC", "Apache Avro"],
        correctAnswer: "Apache Iceberg",
      },
    ],
  },
  {
    lessonId: "s3_lesson_54",
    title: "S3 Vector Buckets",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_data_engineer"],
    durationSeconds: 300,
    difficulty: "hard",
    xpReward: 110,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_4"],
    content: [
      {
        type: "text",
        text: "S3 Vector Buckets are a new bucket type purpose-built for storing and querying vector embeddings for AI/ML workloads. Vector embeddings are numeric representations of data (text, images, audio) used by machine learning models for similarity search.\n\nCore concepts:\n• Vector bucket – Container for vector indexes\n• Vector index – A collection of vectors within a bucket, configured with a specific dimension count, distance metric, and metadata settings\n• Vectors – Stored as arrays of floating-point numbers with optional metadata for filtering",
      },
      {
        type: "text",
        text: "S3 Vector Buckets support similarity search using distance metrics:\n• Cosine similarity – Measures angle between vectors (text/semantic similarity)\n• Euclidean distance – Measures straight-line distance\n• Dot product – Measures directional alignment\n\nYou can query vectors with metadata filters to narrow the search space. S3 Vectors integrates with Amazon Bedrock Knowledge Bases and Amazon OpenSearch for RAG (Retrieval-Augmented Generation) applications.",
      },
      {
        type: "quiz",
        question: "What is the primary use case for S3 Vector Buckets?",
        options: ["Storing and querying vector embeddings for AI/ML similarity search", "Storing large video files for streaming", "High-performance transactional storage", "Storing tabular data for analytics"],
        correctAnswer: "Storing and querying vector embeddings for AI/ML similarity search",
      },
    ],
  },
  {
    lessonId: "s3_lesson_55",
    title: "Virtual Hosting of Buckets",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "software_development_engineer", "cloud_administrator"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 70,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_7"],
    content: [
      {
        type: "text",
        text: "S3 supports two URL styles for accessing objects:\n\n1. Virtual-hosted-style (preferred): https://{bucket}.s3.{region}.amazonaws.com/{key}\n   Example: https://my-bucket.s3.us-east-1.amazonaws.com/photos/cat.jpg\n\n2. Path-style (legacy, being deprecated): https://s3.{region}.amazonaws.com/{bucket}/{key}\n   Example: https://s3.us-east-1.amazonaws.com/my-bucket/photos/cat.jpg\n\nVirtual-hosted-style is preferred because it:\n• Supports HTTPS with per-bucket SSL certificates\n• Works with custom domain names\n• Required for Transfer Acceleration\n• Is the only style supported by S3 Express One Zone",
      },
      {
        type: "quiz",
        question: "Which URL style is preferred for accessing S3 objects and is required for Transfer Acceleration?",
        options: ["Virtual-hosted-style: {bucket}.s3.{region}.amazonaws.com/{key}", "Path-style: s3.{region}.amazonaws.com/{bucket}/{key}", "Both styles are equally supported", "Neither — custom domains are required"],
        correctAnswer: "Virtual-hosted-style: {bucket}.s3.{region}.amazonaws.com/{key}",
      },
    ],
  },
  {
    lessonId: "s3_lesson_56",
    title: "S3 Multi-Region Access Points",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_administrator"],
    durationSeconds: 300,
    difficulty: "hard",
    xpReward: 110,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_16"],
    content: [
      {
        type: "text",
        text: "S3 Multi-Region Access Points (MRAPs) provide a single global endpoint that routes requests to the S3 bucket in the AWS Region with the lowest latency. They are designed for globally distributed applications that need fast access to shared data.\n\nKey capabilities:\n• Automatic routing to the lowest-latency bucket\n• Failover: if one Region becomes unavailable, traffic is routed to another\n• Works with S3 replication to keep multiple regional buckets in sync\n• Active-active: read and write from any Region\n• Each MRAP gets a unique global endpoint (e.g., xxxxxx.mrap.accesspoint.s3-global.amazonaws.com)",
      },
      {
        type: "quiz",
        question: "What is the main benefit of using an S3 Multi-Region Access Point?",
        options: ["Automatically routes requests to the S3 bucket with the lowest latency", "Reduces storage costs by deduplicating objects across Regions", "Provides a single bucket that spans multiple Regions", "Enables automatic encryption for cross-Region objects"],
        correctAnswer: "Automatically routes requests to the S3 bucket with the lowest latency",
      },
    ],
  },
  {
    lessonId: "s3_lesson_57",
    title: "Mountpoint for Amazon S3",
    service: "s3",
    roles: ["solutions_architect", "cloud_data_engineer", "software_development_engineer"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_2"],
    content: [
      {
        type: "text",
        text: "Mountpoint for Amazon S3 is an open-source file client that lets you mount an S3 bucket as a local filesystem on Linux. Applications can then access S3 objects using standard file system APIs (open, read, write, close) instead of the S3 API.\n\nHow it works: Mountpoint translates local file system API calls into S3 object API calls (GET, LIST, PUT). It's optimized for read-heavy workloads like data lakes where you process large files with sequential reads.\n\nIdeal use cases:\n• ML training pipelines reading training data from S3\n• Analytics jobs that need to scan large datasets\n• Applications that work with standard file APIs but need S3-scale storage",
      },
      {
        type: "quiz",
        question: "What does Mountpoint for Amazon S3 allow applications to do?",
        options: ["Access S3 buckets using standard local file system APIs", "Access S3 objects faster by caching in RAM", "Mount multiple S3 buckets into a single namespace", "Sync S3 buckets between Regions automatically"],
        correctAnswer: "Access S3 buckets using standard local file system APIs",
      },
    ],
  },
  {
    lessonId: "s3_lesson_58",
    title: "S3 Select",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "cloud_data_engineer", "software_development_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_3"],
    content: [
      {
        type: "text",
        text: "S3 Select allows you to use SQL-like queries to retrieve a subset of data from within an S3 object, without downloading the entire object. This reduces data transfer and processing costs for analytics workloads.\n\nSupported input formats:\n• CSV (with optional header row)\n• JSON (newline-delimited or JSON array)\n• Apache Parquet (columnar format)\n\nOutput formats: CSV or JSON\n\nExample: Instead of downloading a 10 GB CSV log file to filter for errors, you can use S3 Select to return only rows where the status code is 500.",
      },
      {
        type: "code",
        text: `// AWS CLI: S3 Select example
aws s3api select-object-content \\
  --bucket my-bucket \\
  --key logs/2024/access.csv \\
  --expression "SELECT * FROM S3Object WHERE status = '500'" \\
  --expression-type SQL \\
  --input-serialization '{"CSV": {"FileHeaderInfo": "USE"}}' \\
  --output-serialization '{"CSV": {}}' \\
  output.csv`,
      },
      {
        type: "quiz",
        question: "What is the primary benefit of using S3 Select over downloading the entire object?",
        options: ["Reduces data transfer costs by retrieving only the matching subset of data", "Provides faster write performance", "Enables schema evolution on stored data", "Automatically indexes objects for faster search"],
        correctAnswer: "Reduces data transfer costs by retrieving only the matching subset of data",
      },
    ],
  },
  {
    lessonId: "s3_lesson_59",
    title: "S3 Event Notifications",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "software_development_engineer", "cloud_devops_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_36"],
    content: [
      {
        type: "text",
        text: "S3 Event Notifications allow you to automatically trigger workflows when specific events occur in your bucket. You can send notifications to:\n• Amazon SNS – Fan out to multiple subscribers (email, HTTP, SMS, SQS, Lambda)\n• Amazon SQS – Buffer events for processing by consumers\n• AWS Lambda – Invoke serverless functions directly\n• Amazon EventBridge – Route events to 18+ AWS services with advanced filtering\n\nEvent types include: ObjectCreated (Put, Post, Copy, MultipartUpload), ObjectRemoved (Delete, DeleteMarkerCreated), ObjectRestore (initiated, completed), Replication events, Lifecycle events, and more.",
      },
      {
        type: "quiz",
        question: "Which S3 notification destination provides the most advanced event routing and filtering to 18+ AWS services?",
        options: ["Amazon EventBridge", "Amazon SNS", "Amazon SQS", "AWS Lambda"],
        correctAnswer: "Amazon EventBridge",
      },
      {
        type: "text",
        text: "Important: S3 event notifications are delivered on a best-effort basis. For most objects, notifications are delivered in seconds. However, occasional notification delivery issues may occur. If you need guaranteed delivery and ordering, consider using Amazon EventBridge, which provides additional reliability guarantees.",
      },
    ],
  },
  {
    lessonId: "s3_lesson_60",
    title: "S3 Paying for Storage: How Billing Works",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator", "cloud_data_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_26"],
    content: [
      {
        type: "text",
        text: "Amazon S3 uses a pay-per-use model with no minimum fees and no upfront commitments. You are charged for:\n\n1. Storage – Price per GB per month. Varies by storage class and Region.\n2. Requests – Price per 1,000 requests. PUT/COPY/POST are more expensive than GET/HEAD.\n3. Data Transfer – Outbound data transfer from S3 to the internet or other Regions. Transfer to EC2 in the same Region is free.\n4. Retrieval fees – Apply to IA, One Zone-IA, Glacier classes. Charged per GB retrieved.\n5. Early deletion fees – Charged if you delete before the minimum storage duration.\n6. Management features – S3 Inventory, Analytics, Batch Operations, Object Tagging in bulk.",
      },
      {
        type: "quiz",
        question: "Which of the following S3 data transfers is FREE of charge?",
        options: ["Transfer from S3 to EC2 in the same AWS Region", "Transfer from S3 to the internet", "Transfer from S3 to a different AWS Region", "Transfer from on-premises to S3"],
        correctAnswer: "Transfer from S3 to EC2 in the same AWS Region",
      },
      {
        type: "text",
        text: "Cost optimization strategies:\n• Use S3 Intelligent-Tiering for data with unpredictable access patterns\n• Implement Lifecycle policies to automatically transition/expire old data\n• Use S3 Storage Lens to gain visibility into storage usage across your organization\n• Enable S3 Inventory to audit object metadata and identify cost-saving opportunities\n• Use S3 Storage Class Analysis to identify candidates for transition to cheaper classes",
      },
    ],
  },

  // ============================================
  // S3 MODULE 6: DATA PROTECTION & REPLICATION (10 lessons)
  // ============================================
  {
    lessonId: "s3_lesson_61",
    title: "S3 Replication Overview",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator", "cloud_devops_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_41"],
    content: [
      {
        type: "text",
        text: "S3 Replication automatically copies objects from a source bucket to one or more destination buckets. There are two main modes:\n\n• CRR (Cross-Region Replication) – Replicates to a bucket in a different AWS Region. Use for: disaster recovery, compliance with data residency requirements, reducing latency for globally distributed users.\n\n• SRR (Same-Region Replication) – Replicates within the same Region. Use for: aggregating logs from multiple buckets, maintaining production and test environments in sync, compliance requirements for data copies in the same Region.",
      },
      {
        type: "quiz",
        question: "What type of replication would you configure to automatically copy objects to a bucket in a different AWS Region for disaster recovery?",
        options: ["Cross-Region Replication (CRR)", "Same-Region Replication (SRR)", "Batch Replication", "S3 Versioning"],
        correctAnswer: "Cross-Region Replication (CRR)",
      },
    ],
  },
  {
    lessonId: "s3_lesson_62",
    title: "Setting Up S3 Live Replication",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator", "cloud_devops_engineer"],
    durationSeconds: 360,
    difficulty: "hard",
    xpReward: 110,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_61"],
    content: [
      {
        type: "text",
        text: "Prerequisites for setting up S3 live replication:\n1. Source and destination buckets must have Versioning ENABLED\n2. Create an IAM role that S3 can assume to replicate objects\n3. Attach a replication configuration to the source bucket (JSON/XML)\n4. The IAM role must have permissions on both source and destination buckets\n5. For cross-account replication: the destination bucket policy must allow the source account's replication role\n\nWhen S3 Object Lock is in use, the destination bucket must also have Object Lock enabled, and the replication role must have s3:ReplicateDelete and s3:ObjectOwnerOverrideToBucketOwner permissions.",
      },
      {
        type: "text",
        text: "What IS and IS NOT replicated by live replication:\n\nIS replicated:\n• New object uploads\n• Object metadata\n• Object tags\n• Object ACLs (if ACL replication is enabled)\n• Delete markers (if delete marker replication is enabled)\n\nIS NOT replicated:\n• Objects already in the bucket before replication was configured (use Batch Replication)\n• Objects in Glacier or Glacier Deep Archive\n• Objects in buckets without Versioning\n• System actions by S3 (like Lifecycle expirations)",
      },
      {
        type: "quiz",
        question: "What must be enabled on BOTH source and destination S3 buckets for live replication to work?",
        options: ["S3 Versioning", "S3 Block Public Access", "Server-Side Encryption", "S3 Object Lock"],
        correctAnswer: "S3 Versioning",
      },
    ],
  },
  {
    lessonId: "s3_lesson_63",
    title: "S3 Batch Replication",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator"],
    durationSeconds: 240,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_61", "s3_lesson_47"],
    content: [
      {
        type: "text",
        text: "Batch Replication replicates existing objects — objects that were in the source bucket before live replication was configured, or objects that failed replication. Unlike live replication (which is continuous), Batch Replication is an on-demand operation using S3 Batch Operations.\n\nUse cases:\n• Replicate existing objects when setting up replication for the first time\n• Re-replicate failed objects\n• Copy objects between buckets in the same account\n• Replicate objects that don't meet live replication criteria (e.g., failed encryption checks)",
      },
      {
        type: "quiz",
        question: "Which S3 feature is used to replicate objects that existed in a bucket BEFORE live replication was configured?",
        options: ["S3 Batch Replication (via S3 Batch Operations)", "S3 Transfer Acceleration", "S3 Cross-Region Replication rules", "S3 Versioning rollback"],
        correctAnswer: "S3 Batch Replication (via S3 Batch Operations)",
      },
    ],
  },
  {
    lessonId: "s3_lesson_64",
    title: "S3 Replication Time Control (RTC)",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator"],
    durationSeconds: 240,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_62"],
    content: [
      {
        type: "text",
        text: "S3 Replication Time Control (S3 RTC) provides an SLA that 99.99% of objects will be replicated within 15 minutes. Without RTC, replication typically completes in seconds to minutes, but there is no guaranteed SLA.\n\nS3 RTC also includes:\n• CloudWatch metrics for monitoring replication lag (PendingReplicationBytes, ReplicationLatency)\n• EventBridge notifications for replication failures\n• Detailed replication status on each object\n\nS3 RTC is useful for compliance requirements that mandate data copies within a specific time window, and for disaster recovery scenarios where RPO (Recovery Point Objective) matters.",
      },
      {
        type: "quiz",
        question: "What SLA does S3 Replication Time Control (RTC) provide for object replication?",
        options: ["99.99% of objects replicated within 15 minutes", "99.9% of objects replicated within 1 hour", "100% of objects replicated within 5 minutes", "Objects replicated on a best-effort basis within 24 hours"],
        correctAnswer: "99.99% of objects replicated within 15 minutes",
      },
    ],
  },
  {
    lessonId: "s3_lesson_65",
    title: "Bi-Directional Replication",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator"],
    durationSeconds: 240,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_62"],
    content: [
      {
        type: "text",
        text: "Bi-directional (two-way) replication allows objects to be replicated from Bucket A to Bucket B AND from Bucket B to Bucket A. This enables active-active scenarios where both buckets can receive writes and stay in sync.\n\nTo set up bi-directional replication:\n1. Create a replication rule from Bucket A → Bucket B\n2. Create a separate replication rule from Bucket B → Bucket A\n\nS3 includes built-in loop detection to prevent replication loops — a replicated object will not be re-replicated back to the source bucket.",
      },
      {
        type: "quiz",
        question: "In S3 bi-directional replication, what prevents an infinite replication loop?",
        options: ["S3 has built-in loop detection that prevents replicated objects from being re-replicated", "You must manually configure filters to exclude replicated objects", "Bi-directional replication is not possible in S3", "The version ID prevents duplicate replication"],
        correctAnswer: "S3 has built-in loop detection that prevents replicated objects from being re-replicated",
      },
    ],
  },
  {
    lessonId: "s3_lesson_66",
    title: "Replication and Delete Markers",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator"],
    durationSeconds: 240,
    difficulty: "hard",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_62", "s3_lesson_40"],
    content: [
      {
        type: "text",
        text: "By default, S3 replication does NOT replicate delete markers. When you delete an object in the source bucket (creating a delete marker), that delete marker is not replicated to the destination bucket. The object remains accessible in the destination bucket.\n\nYou can optionally enable delete marker replication in your replication configuration. When enabled:\n• Delete markers are replicated\n• Deletions in the source appear as deletions in the destination\n\nNote: Permanent deletions (specifying a version ID) are NEVER replicated. This protects against accidental or malicious permanent data deletion propagating across replicas.",
      },
      {
        type: "quiz",
        question: "By default, are delete markers replicated in S3 replication?",
        options: ["No, delete marker replication must be explicitly enabled", "Yes, all deletes are replicated by default", "Yes, but only for cross-Region replication", "Delete markers cannot be replicated at all"],
        correctAnswer: "No, delete marker replication must be explicitly enabled",
      },
    ],
  },
  {
    lessonId: "s3_lesson_67",
    title: "Monitoring S3 Replication",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator", "cloud_devops_engineer"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_61"],
    content: [
      {
        type: "text",
        text: "S3 provides several mechanisms to monitor replication progress:\n\n1. Object replication status – Each object has a replication status field:\n   • PENDING – Awaiting replication\n   • COMPLETED – Successfully replicated\n   • FAILED – Replication failed\n   • REPLICA – This is the replicated object in the destination\n\n2. Amazon CloudWatch metrics (with S3 RTC):\n   • BucketReplicationBytes – Bytes pending replication\n   • ReplicationLatency – Maximum replication delay in seconds\n   • BytesPendingReplication – Pending bytes by storage class\n\n3. S3 Replication failure events – Sent via Amazon EventBridge when replication fails",
      },
      {
        type: "quiz",
        question: "What replication status indicates that an object in the source bucket is waiting to be replicated?",
        options: ["PENDING", "QUEUED", "IN_PROGRESS", "AWAITING"],
        correctAnswer: "PENDING",
      },
    ],
  },
  {
    lessonId: "s3_lesson_68",
    title: "Backing Up Data with S3 Versioning",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_41"],
    content: [
      {
        type: "text",
        text: "S3 Versioning is the simplest backup strategy for S3 data. With versioning:\n• Every PUT overwrites create a new version (old version preserved)\n• Deletes create a delete marker (previous version still accessible by version ID)\n• You can restore previous versions at any time\n\nFor a complete backup strategy, combine Versioning with:\n1. S3 Cross-Region Replication – Protect against Region failure\n2. S3 Lifecycle rules – Automatically expire old versions after N days to control costs\n3. S3 Object Lock – Prevent modification or deletion for compliance",
      },
      {
        type: "quiz",
        question: "What is the cheapest way to protect against accidental object overwrites in S3?",
        options: ["Enable S3 Versioning on the bucket", "Set up Cross-Region Replication to a separate account", "Enable S3 Object Lock in Compliance mode", "Use S3 Batch Operations to create daily copies"],
        correctAnswer: "Enable S3 Versioning on the bucket",
      },
    ],
  },
  {
    lessonId: "s3_lesson_69",
    title: "S3 Resilience and Durability",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_26"],
    content: [
      {
        type: "text",
        text: "Amazon S3 is designed for 99.999999999% (11 nines) durability of objects. This means if you store 10,000,000 objects, you can expect to lose at most 1 object every 10,000 years on average.\n\nHow S3 achieves this durability:\n• Objects are automatically stored across a minimum of 3 Availability Zones (for Standard, Standard-IA, and Glacier classes)\n• S3 continuously checks data integrity using checksums\n• Detected corruption is automatically repaired using redundant data\n• S3 Standard and Glacier classes are designed for 99.99% availability",
      },
      {
        type: "quiz",
        question: "What is the designed durability of Amazon S3 for Standard and Glacier storage classes?",
        options: ["99.999999999% (11 nines)", "99.9999999% (9 nines)", "99.99% (4 nines)", "100% (no data loss ever)"],
        correctAnswer: "99.999999999% (11 nines)",
      },
    ],
  },
  {
    lessonId: "s3_lesson_70",
    title: "Disaster Recovery with S3",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator"],
    durationSeconds: 300,
    difficulty: "hard",
    xpReward: 110,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_61", "s3_lesson_68"],
    content: [
      {
        type: "text",
        text: "S3 provides multiple disaster recovery capabilities that map to different RTO/RPO requirements:\n\n• RTO = Recovery Time Objective (how long it takes to recover)\n• RPO = Recovery Point Objective (how much data can you afford to lose)\n\nS3 DR strategies by RTO/RPO:\n1. S3 Versioning only → RTO: minutes, RPO: varies (previous version age)\n2. S3 SRR (Same-Region Replication) → RTO: seconds, RPO: near-zero, but no Region failure protection\n3. S3 CRR (Cross-Region Replication) → RTO: seconds-minutes, RPO: seconds (or 15 min with RTC), protects against Region failure\n4. S3 Multi-Region Access Points → Active-active with automatic failover",
      },
      {
        type: "quiz",
        question: "Which S3 DR configuration provides protection against an entire AWS Region becoming unavailable?",
        options: ["Cross-Region Replication (CRR) to a bucket in a different Region", "Same-Region Replication (SRR)", "S3 Versioning with Lifecycle rules", "S3 Object Lock"],
        correctAnswer: "Cross-Region Replication (CRR) to a bucket in a different Region",
      },
    ],
  },

  // ============================================
  // S3 MODULE 7: LIFECYCLE MANAGEMENT (8 lessons)
  // ============================================
  {
    lessonId: "s3_lesson_71",
    title: "S3 Lifecycle Overview",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator", "cloud_data_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_26"],
    content: [
      {
        type: "text",
        text: "S3 Lifecycle allows you to automatically manage objects throughout their lifetime using rules. Lifecycle rules have two types of actions:\n\n1. Transition actions – Move objects to a cheaper storage class after a specified period\n   Example: Move to Standard-IA after 30 days, then to Glacier after 90 days\n\n2. Expiration actions – Delete objects (or versions) after a specified period\n   Example: Delete log files after 365 days, delete non-current versions after 30 days\n\nRules can be scoped to the entire bucket, a key prefix, or object tags.",
      },
      {
        type: "quiz",
        question: "What are the two types of actions in an S3 Lifecycle rule?",
        options: ["Transition actions and Expiration actions", "Move actions and Delete actions", "Archive actions and Restore actions", "Copy actions and Remove actions"],
        correctAnswer: "Transition actions and Expiration actions",
      },
    ],
  },
  {
    lessonId: "s3_lesson_72",
    title: "S3 Lifecycle Transitions",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator", "cloud_data_engineer"],
    durationSeconds: 360,
    difficulty: "medium",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_71"],
    content: [
      {
        type: "text",
        text: "S3 Lifecycle transitions must follow a waterfall pattern — you can only transition objects to a 'colder' (cheaper) storage class, never to a 'warmer' one. The allowed transition paths:\n\nStandard → Standard-IA → One Zone-IA → Glacier Instant Retrieval → Glacier Flexible Retrieval → Glacier Deep Archive\n\nStandard → Intelligent-Tiering (at any time)\nAny → Express One Zone (not supported via Lifecycle)\n\nMinimum time before transition from Standard to IA classes: 30 days (to avoid early deletion fees). Minimum time before transition to Glacier classes: 30 days (from Standard) or 0 days (from IA classes).",
      },
      {
        type: "code",
        text: `// Example: Lifecycle rule to transition and expire objects
{
  "Rules": [
    {
      "Id": "cost-optimization-rule",
      "Status": "Enabled",
      "Filter": { "Prefix": "logs/" },
      "Transitions": [
        { "Days": 30, "StorageClass": "STANDARD_IA" },
        { "Days": 90, "StorageClass": "GLACIER" },
        { "Days": 365, "StorageClass": "DEEP_ARCHIVE" }
      ],
      "Expiration": {
        "Days": 730
      }
    }
  ]
}`,
      },
      {
        type: "quiz",
        question: "Can you use S3 Lifecycle rules to transition an object from Glacier back to Standard?",
        options: ["No, Lifecycle transitions only go to colder storage classes", "Yes, using the RestoreObject API in the Lifecycle rule", "Yes, but only if the object is in Glacier Instant Retrieval", "Yes, with a special 'warm-transition' rule type"],
        correctAnswer: "No, Lifecycle transitions only go to colder storage classes",
      },
    ],
  },
  {
    lessonId: "s3_lesson_73",
    title: "S3 Lifecycle Expiration",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator", "cloud_data_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_71", "s3_lesson_41"],
    content: [
      {
        type: "text",
        text: "Lifecycle expiration rules delete objects automatically. There are several types of expiration:\n\n1. Current version expiration – Permanently deletes objects after N days (unversioned) or creates a delete marker (versioned)\n2. Non-current version expiration – Delete older versions of objects in versioned buckets after N days\n3. Delete expired object delete markers – Cleans up delete markers when all versions of an object are gone\n4. Abort incomplete multipart uploads – Cleans up failed multipart upload parts after N days (saves storage costs)",
      },
      {
        type: "quiz",
        question: "What happens when a Lifecycle expiration rule fires on an object in a VERSIONED bucket?",
        options: ["A delete marker is created (the object is not permanently deleted)", "The object and all its versions are permanently deleted", "The object is moved to Glacier", "An error occurs — expiration is not allowed on versioned buckets"],
        correctAnswer: "A delete marker is created (the object is not permanently deleted)",
      },
      {
        type: "text",
        text: "Best practice: Always set up a Lifecycle rule to abort incomplete multipart uploads. Otherwise, partial upload parts accumulate silently and incur storage charges. Example rule: `AbortIncompleteMultipartUpload: { DaysAfterInitiation: 7 }`",
      },
    ],
  },
  {
    lessonId: "s3_lesson_74",
    title: "Lifecycle and Versioning Interactions",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator"],
    durationSeconds: 300,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_72", "s3_lesson_73", "s3_lesson_41"],
    content: [
      {
        type: "text",
        text: "When Lifecycle and Versioning interact, the behavior can be complex:\n\n• Lifecycle transition rules apply only to the CURRENT version of an object\n• Non-current version transition rules can be used to archive old versions\n• Expiration on versioned buckets: if you only specify `Days`, S3 creates a delete marker rather than deleting\n• To truly expire old versions, use `NoncurrentVersionExpiration` with a `NoncurrentDays` value\n\nFor versioned buckets, a complete Lifecycle strategy typically includes:\n1. Transition current versions to IA then Glacier over time\n2. Expire old non-current versions after N days\n3. Delete expired delete markers to reduce clutter",
      },
      {
        type: "quiz",
        question: "Which Lifecycle action specifically targets and deletes OLDER (non-current) versions of objects in a versioned bucket?",
        options: ["NoncurrentVersionExpiration with a NoncurrentDays setting", "Expiration with a Days setting", "Transition with StorageClass: DELETE", "AbortIncompleteMultipartUpload"],
        correctAnswer: "NoncurrentVersionExpiration with a NoncurrentDays setting",
      },
    ],
  },
  {
    lessonId: "s3_lesson_75",
    title: "Lifecycle Rule Filters",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator", "cloud_data_engineer"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 70,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_71"],
    content: [
      {
        type: "text",
        text: "S3 Lifecycle rules can be filtered to apply to specific subsets of objects:\n\n1. No filter – Rule applies to all objects in the bucket\n2. Prefix filter – Rule applies to objects whose key starts with the specified prefix\n   Example: prefix='logs/' applies to all objects under the 'logs/' folder\n3. Tag filter – Rule applies to objects with specific tags\n   Example: Tag: {Key:'Environment', Value:'Dev'}\n4. Object size filter – Rule applies based on minimum/maximum object size\n5. AND filter – Combine multiple filter types (e.g., prefix AND tag AND size)\n\nFilter specificity matters: more specific rules take precedence, and conflicting rules are resolved according to the rule priority.",
      },
      {
        type: "quiz",
        question: "You want a Lifecycle rule to apply only to objects larger than 1 GB in the 'videos/' prefix. Which filter combination should you use?",
        options: ["AND filter combining Prefix: 'videos/' and ObjectSizeGreaterThan: 1073741824", "Prefix filter: 'videos/' only (size filtering is not supported)", "Tag filter: {Key:'size', Value:'large'}", "Two separate rules: one for prefix and one for size"],
        correctAnswer: "AND filter combining Prefix: 'videos/' and ObjectSizeGreaterThan: 1073741824",
      },
    ],
  },
  {
    lessonId: "s3_lesson_76",
    title: "Lifecycle Configuration via CLI and API",
    service: "s3",
    roles: ["solutions_architect", "software_development_engineer", "cloud_devops_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_71"],
    content: [
      {
        type: "code",
        text: `// AWS CLI: Put Lifecycle configuration
aws s3api put-bucket-lifecycle-configuration \\
  --bucket my-bucket \\
  --lifecycle-configuration file://lifecycle.json

// lifecycle.json example
{
  "Rules": [
    {
      "ID": "transition-logs",
      "Status": "Enabled",
      "Filter": { "Prefix": "logs/" },
      "Transitions": [
        { "Days": 30, "StorageClass": "STANDARD_IA" },
        { "Days": 90, "StorageClass": "GLACIER" }
      ],
      "Expiration": { "Days": 365 },
      "AbortIncompleteMultipartUpload": {
        "DaysAfterInitiation": 7
      }
    }
  ]
}

// Get current Lifecycle configuration
aws s3api get-bucket-lifecycle-configuration --bucket my-bucket

// Delete Lifecycle configuration
aws s3api delete-bucket-lifecycle --bucket my-bucket`,
      },
      {
        type: "quiz",
        question: "After updating an S3 Lifecycle configuration, how long can it take for the changes to take full effect?",
        options: ["A few hours to a few days", "Immediately", "Exactly 24 hours", "1-2 weeks"],
        correctAnswer: "A few hours to a few days",
      },
    ],
  },
  {
    lessonId: "s3_lesson_77",
    title: "S3 Lifecycle Event Notifications",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator", "cloud_devops_engineer"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_71", "s3_lesson_59"],
    content: [
      {
        type: "text",
        text: "S3 Lifecycle actions can trigger event notifications via Amazon EventBridge. This allows you to monitor and respond to Lifecycle events:\n\nLifecycle event types:\n• s3:LifecycleTransition – Object was transitioned to a different storage class\n• s3:LifecycleExpiration:Delete – Object was permanently deleted by a Lifecycle expiration rule\n• s3:LifecycleExpiration:DeleteMarkerCreated – Lifecycle created a delete marker in a versioned bucket\n\nUse cases: Audit Lifecycle actions, trigger downstream workflows when objects are archived, send alerts when important objects are deleted.",
      },
      {
        type: "quiz",
        question: "Which AWS service should you use to receive notifications when S3 Lifecycle deletes objects?",
        options: ["Amazon EventBridge", "AWS CloudTrail only", "Amazon S3 itself (no external service needed)", "Amazon Inspector"],
        correctAnswer: "Amazon EventBridge",
      },
    ],
  },
  {
    lessonId: "s3_lesson_78",
    title: "Common Lifecycle Patterns",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator", "cloud_data_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_72", "s3_lesson_73"],
    content: [
      {
        type: "text",
        text: "Common S3 Lifecycle patterns for real-world workloads:\n\n1. Log archive pattern:\n   0-30 days: Standard → 30-90 days: Standard-IA → 90-365 days: Glacier → >365 days: Delete\n\n2. Media archive pattern:\n   0-90 days: Standard (active editing) → 90-365 days: Standard-IA (occasional access) → >365 days: Glacier Deep Archive\n\n3. Compliance retention:\n   Store in Standard for 7 years → Transition to Glacier Deep Archive → Delete at year 10\n   (Use Object Lock to prevent deletion during retention period)\n\n4. Cost-optimized backup:\n   Current version: Standard → IA after 30 days\n   Non-current versions: Delete after 30 days to prevent version accumulation cost",
      },
      {
        type: "quiz",
        question: "For a compliance workload requiring 7-year data retention with guaranteed write protection, which combination would you use?",
        options: ["S3 Object Lock (Compliance mode) + Lifecycle rule to Glacier Deep Archive after 1 year", "S3 Versioning + Lifecycle expiration after 7 years", "S3 Replication + Lifecycle transition to Standard-IA", "S3 Intelligent-Tiering + S3 Select"],
        correctAnswer: "S3 Object Lock (Compliance mode) + Lifecycle rule to Glacier Deep Archive after 1 year",
      },
    ],
  },

  // ============================================
  // S3 MODULE 8: MONITORING, LOGGING & ANALYTICS (8 lessons)
  // ============================================
  {
    lessonId: "s3_lesson_79",
    title: "AWS CloudTrail for S3",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator", "cloud_security_engineer", "cloud_devops_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_11"],
    content: [
      {
        type: "text",
        text: "AWS CloudTrail records all API calls made to Amazon S3, providing a detailed audit trail of who did what and when. CloudTrail captures two types of S3 events:\n\n1. Management events (control plane) – Recorded by default. Includes bucket-level operations like CreateBucket, DeleteBucket, PutBucketPolicy, PutBucketVersioning.\n\n2. Data events (data plane) – NOT recorded by default (high volume, additional cost). Includes object-level operations like GetObject, PutObject, DeleteObject. Must be explicitly enabled per bucket or for all buckets.",
      },
      {
        type: "quiz",
        question: "By default, does AWS CloudTrail record S3 data events like GetObject and PutObject?",
        options: ["No, data events must be explicitly enabled", "Yes, all S3 events are recorded by default", "Only GetObject is recorded by default", "Only PutObject and DeleteObject are recorded by default"],
        correctAnswer: "No, data events must be explicitly enabled",
      },
      {
        type: "text",
        text: "Use cases for S3 CloudTrail logs:\n• Security investigation: Who accessed or deleted an object?\n• Compliance auditing: Prove data access patterns to auditors\n• Troubleshooting: Identify which requests are causing errors\n• Cost analysis: Understand which principals generate the most S3 requests\n\nCloudTrail logs are delivered to an S3 bucket within ~15 minutes of the API call.",
      },
    ],
  },
  {
    lessonId: "s3_lesson_80",
    title: "S3 Server Access Logging",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator", "cloud_security_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_11"],
    content: [
      {
        type: "text",
        text: "S3 Server Access Logging provides detailed records for requests made to your bucket — separate from CloudTrail. Each log record includes fields like the requester's IP address, request time, HTTP status code, bytes sent, and error code.\n\nKey differences from CloudTrail:\n• Server Access Logging is delivered on a best-effort basis (not guaranteed)\n• Log delivery is asynchronous and may be delayed\n• CloudTrail is more reliable and structured; Server Access Logs are better for network-level details\n• Server Access Logs are stored as raw text files in a target S3 bucket\n• Does NOT support directory buckets (S3 Express One Zone)",
      },
      {
        type: "quiz",
        question: "Which S3 logging mechanism provides guaranteed, near-real-time delivery of API call records?",
        options: ["AWS CloudTrail", "S3 Server Access Logging", "Amazon CloudWatch Logs", "S3 Event Notifications"],
        correctAnswer: "AWS CloudTrail",
      },
    ],
  },
  {
    lessonId: "s3_lesson_81",
    title: "Amazon CloudWatch Metrics for S3",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator", "cloud_devops_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_11"],
    content: [
      {
        type: "text",
        text: "Amazon S3 publishes metrics to Amazon CloudWatch for monitoring storage usage and request performance.\n\nStorage metrics (free, daily):\n• BucketSizeBytes – Total bytes stored in a bucket by storage class\n• NumberOfObjects – Total objects (including delete markers, incomplete multipart parts)\n\nRequest metrics (paid, 1-minute granularity, must be enabled):\n• AllRequests, GetRequests, PutRequests, ListRequests\n• 4xxErrors, 5xxErrors – HTTP error counts\n• FirstByteLatency – Time from S3 receiving request to sending first byte\n• TotalRequestLatency – End-to-end request latency\n• BytesDownloaded, BytesUploaded",
      },
      {
        type: "quiz",
        question: "Which S3 CloudWatch metrics require explicit configuration and incur additional cost?",
        options: ["Request metrics (1-minute granularity: latency, errors, request counts)", "Storage metrics (BucketSizeBytes, NumberOfObjects)", "Both storage and request metrics", "Neither — all CloudWatch metrics are free and auto-enabled"],
        correctAnswer: "Request metrics (1-minute granularity: latency, errors, request counts)",
      },
    ],
  },
  {
    lessonId: "s3_lesson_82",
    title: "S3 Storage Lens",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator", "cloud_data_engineer"],
    durationSeconds: 360,
    difficulty: "medium",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_81"],
    content: [
      {
        type: "text",
        text: "S3 Storage Lens provides organization-wide visibility into S3 storage usage and activity through interactive dashboards and metrics. Unlike per-bucket CloudWatch metrics, Storage Lens aggregates data across an entire AWS Organization, specific accounts, Regions, buckets, or prefixes.\n\nStorage Lens provides 60+ metrics organized into categories:\n• Summary: total storage, object count\n• Cost optimization: % of IA-eligible data, incomplete multipart uploads\n• Data protection: % of objects with versioning, replication, encryption\n• Activity: request counts, errors, latency\n• Performance: request rates, throughput\n• Detailed status codes: 2xx, 4xx, 5xx breakdown",
      },
      {
        type: "quiz",
        question: "What is the key advantage of S3 Storage Lens over per-bucket CloudWatch metrics?",
        options: ["It provides organization-wide aggregated visibility across all accounts, Regions, and buckets", "It has finer granularity (sub-second metrics)", "It is free whereas CloudWatch charges for request metrics", "It provides real-time alerts for security events"],
        correctAnswer: "It provides organization-wide aggregated visibility across all accounts, Regions, and buckets",
      },
      {
        type: "text",
        text: "S3 Storage Lens has two tiers:\n• Free default dashboard – 15 metrics, 14-day retention, available for every account automatically\n• Advanced metrics (paid) – 60+ metrics, 15-month retention, prefix-level aggregation, CloudWatch integration\n\nStorage Lens dashboards can be exported daily to an S3 bucket in CSV, Apache Parquet, or Parquet format for custom analysis.",
      },
    ],
  },
  {
    lessonId: "s3_lesson_83",
    title: "Querying S3 Access Logs with Athena",
    service: "s3",
    roles: ["solutions_architect", "cloud_data_engineer"],
    durationSeconds: 240,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_80", "s3_lesson_79"],
    content: [
      {
        type: "text",
        text: "You can use Amazon Athena to run SQL queries directly against S3 server access logs or CloudTrail logs stored in S3. This is useful for ad-hoc security analysis, cost attribution, and compliance reporting without ETL pipelines.\n\nFor S3 Inventory reports, you can use the Athena integration in the S3 console to create a table over your Inventory data and run SQL queries to analyze object metadata at scale.",
      },
      {
        type: "code",
        text: `-- Example: Query S3 server access logs with Athena
-- Find all 403 errors in the last 7 days
SELECT requester, key, operation, httpstatus, errcode, bytessent
FROM s3_access_logs_db.my_bucket_logs
WHERE httpstatus = 403
  AND parse_datetime(requestdatetime,'dd/MMM/yyyy:HH:mm:ss Z')
      > now() - interval '7' day
ORDER BY requestdatetime DESC
LIMIT 100;`,
      },
      {
        type: "quiz",
        question: "What AWS service allows you to run SQL queries directly on S3 access logs stored in S3?",
        options: ["Amazon Athena", "Amazon RDS", "AWS Glue", "Amazon Redshift only"],
        correctAnswer: "Amazon Athena",
      },
    ],
  },
  {
    lessonId: "s3_lesson_84",
    title: "S3 Replication Metrics and Monitoring",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator", "cloud_devops_engineer"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_67"],
    content: [
      {
        type: "text",
        text: "With S3 Replication Time Control enabled, you get detailed CloudWatch metrics:\n• BucketReplicationBytes – Bytes of pending replication per minute\n• ReplicationLatency – Maximum number of seconds by which replication is behind\n• BytesPendingReplication – Bytes not yet replicated (per storage class)\n• OperationsPendingReplication – Object count not yet replicated\n• OperationsFailedReplication – Failed replication operations\n\nYou can also view the replication status field on individual objects to check whether an object has been replicated.",
      },
      {
        type: "quiz",
        question: "Which CloudWatch metric tells you the maximum number of seconds by which S3 replication is currently lagging?",
        options: ["ReplicationLatency", "BucketReplicationBytes", "OperationsPendingReplication", "ReplicationDelay"],
        correctAnswer: "ReplicationLatency",
      },
    ],
  },
  {
    lessonId: "s3_lesson_85",
    title: "S3 Cost Allocation Tags and Usage Reports",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator", "cloud_data_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_43"],
    content: [
      {
        type: "text",
        text: "S3 supports cost allocation tags at both the bucket and object level. Cost allocation tags are activated in the AWS Billing console and appear in your Cost Explorer reports and CSV billing reports.\n\nBucket-level cost allocation is the most common approach: tag buckets with project, team, environment, or cost center, then filter billing reports by these tags to understand S3 costs per team or project.\n\nFor more granular tracking, object tags can be used with S3 Storage Lens Storage Lens group metrics to understand activity by tag values.",
      },
      {
        type: "quiz",
        question: "Where must cost allocation tags be activated before they appear in AWS billing reports?",
        options: ["In the AWS Billing and Cost Management console", "In the S3 bucket settings", "In AWS CloudTrail settings", "They activate automatically when applied to buckets"],
        correctAnswer: "In the AWS Billing and Cost Management console",
      },
    ],
  },
  {
    lessonId: "s3_lesson_86",
    title: "S3 Error Responses and Troubleshooting",
    service: "s3",
    roles: ["solutions_architect", "software_development_engineer", "cloud_engineer", "cloud_devops_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_6"],
    content: [
      {
        type: "text",
        text: "Common S3 HTTP error codes and their meanings:\n\n• 403 Forbidden – Access denied. Check: IAM policies, bucket policies, ACLs, Block Public Access, VPC endpoint policies\n• 404 Not Found – Object or bucket doesn't exist. Check: key name (case-sensitive!), bucket Region, delete markers on versioned objects\n• 409 Conflict – Conflict state. Common cause: deleting a non-empty bucket, or conditional write failed\n• 500 Internal Server Error – S3-side error. Retry with exponential backoff.\n• 503 Service Unavailable – Request throttling. Implement backoff and retry logic.",
      },
      {
        type: "quiz",
        question: "You receive a 403 Forbidden error when trying to read an S3 object. What is the FIRST thing you should check?",
        options: ["IAM policy permissions and bucket policy for the requesting identity", "Whether the object exists", "The Region of the bucket", "Whether S3 is experiencing an outage"],
        correctAnswer: "IAM policy permissions and bucket policy for the requesting identity",
      },
      {
        type: "text",
        text: "For throttling errors (503 Slow Down or 429 Too Many Requests): Implement exponential backoff with jitter in your retry logic. AWS SDKs include built-in retry logic. For sustained high request rates, distribute your key prefixes across multiple partitions by using random prefixes or hashes.",
      },
    ],
  },

  // ============================================
  // S3 MODULE 9: PERFORMANCE OPTIMIZATION (7 lessons)
  // ============================================
  {
    lessonId: "s3_lesson_87",
    title: "S3 Performance Guidelines Overview",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "software_development_engineer", "cloud_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_36"],
    content: [
      {
        type: "text",
        text: "Amazon S3 is designed to handle high request rates. Default S3 performance:\n• 5,500 GET/HEAD requests per second per prefix\n• 3,500 PUT/COPY/POST/DELETE requests per second per prefix\n\nThere are no fixed partition limits — S3 automatically scales partitions as request rates increase. However, it takes S3 about 30 minutes to adjust partitions after a traffic ramp-up.\n\nKey principle: Distribute requests across MULTIPLE prefixes to scale horizontally beyond the per-prefix limits.",
      },
      {
        type: "quiz",
        question: "What is the default S3 GET/HEAD request rate limit per prefix?",
        options: ["5,500 requests per second", "1,000 requests per second", "10,000 requests per second", "Unlimited — S3 has no rate limits"],
        correctAnswer: "5,500 requests per second",
      },
    ],
  },
  {
    lessonId: "s3_lesson_88",
    title: "Horizontal Scaling with S3 Prefix Distribution",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "software_development_engineer"],
    durationSeconds: 300,
    difficulty: "hard",
    xpReward: 110,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_87"],
    content: [
      {
        type: "text",
        text: "To scale beyond the per-prefix request rate limits, distribute objects across multiple prefixes. Each prefix gets its own partition with independent rate limits.\n\nApproaches to prefix distribution:\n1. Hash prefix: Use a hash of the object ID as a prefix\n   Instead of: logs/2024/01/01/{filename}\n   Use: 3a2f/logs/2024/01/01/{filename} (where '3a2f' is a hash)\n\n2. Date-time prefix (good for time-series data):\n   logs/2024/01/01/13/30/{filename} (partitioned by minute)\n\n3. Random prefix: Prepend a random UUID segment\n\nNote: If your key names are already well-distributed (e.g., all unique random IDs), you likely don't need to add prefixes.",
      },
      {
        type: "quiz",
        question: "You have a single prefix 'photos/' receiving 8,000 GET requests per second. What should you do to handle this load?",
        options: ["Distribute objects across multiple prefixes (e.g., photos/a/, photos/b/)", "Enable S3 Transfer Acceleration", "Use Multipart Upload", "Switch to an S3 Express One Zone bucket"],
        correctAnswer: "Distribute objects across multiple prefixes (e.g., photos/a/, photos/b/)",
      },
    ],
  },
  {
    lessonId: "s3_lesson_89",
    title: "Caching Frequently Accessed S3 Content",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "software_development_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_87"],
    content: [
      {
        type: "text",
        text: "For workloads with a hot set of frequently accessed objects, caching reduces latency and S3 request costs:\n\n1. Amazon CloudFront – CDN that caches S3 objects at edge locations worldwide. Ideal for static website assets, media files, and software downloads. CloudFront Origin Access Control (OAC) restricts direct S3 access to only CloudFront.\n\n2. Amazon ElastiCache – In-memory cache (Redis/Memcached) for caching S3 object content or metadata in application-layer cache.\n\n3. S3 Express One Zone – For applications that need both high performance AND simplicity (no separate cache to manage), co-locating compute and storage in the same AZ provides sub-millisecond latency.",
      },
      {
        type: "quiz",
        question: "Which AWS service provides a global CDN to cache S3 objects at edge locations close to users?",
        options: ["Amazon CloudFront", "Amazon ElastiCache", "AWS Global Accelerator", "S3 Transfer Acceleration"],
        correctAnswer: "Amazon CloudFront",
      },
    ],
  },
  {
    lessonId: "s3_lesson_90",
    title: "Timeouts and Retries for Latency-Sensitive Applications",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "software_development_engineer"],
    durationSeconds: 240,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_87"],
    content: [
      {
        type: "text",
        text: "For latency-sensitive S3 workloads, implement the following patterns:\n\n1. Aggressive timeouts – Set short connection and read timeouts. If an S3 request stalls (which occasionally happens), retrying to a different S3 server is faster than waiting for a slow response.\n\n2. Exponential backoff with jitter – On retry, wait an exponentially increasing amount of time plus a random jitter to avoid 'thundering herd' problems.\n\n3. Hedged requests – Send the same request to multiple endpoints and use the first response. This trades off extra requests for lower tail latency.\n\n4. Use the latest SDK version – AWS SDK retry and connection pool logic is continuously improved.",
      },
      {
        type: "quiz",
        question: "What is the purpose of adding 'jitter' to retry logic for S3 requests?",
        options: ["Prevent multiple clients from retrying simultaneously and overwhelming S3 (avoiding thundering herd)", "Make the retry timing more predictable", "Increase the retry timeout exponentially", "Ensure retries go to a different AWS Region"],
        correctAnswer: "Prevent multiple clients from retrying simultaneously and overwhelming S3 (avoiding thundering herd)",
      },
    ],
  },
  {
    lessonId: "s3_lesson_91",
    title: "Combining S3 with EC2 for Best Performance",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "software_development_engineer"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_87"],
    content: [
      {
        type: "text",
        text: "When using S3 with compute workloads, co-location significantly improves performance:\n\n• Place EC2 instances in the SAME AWS Region as your S3 bucket\n• For S3 Express One Zone: place EC2 instances in the SAME Availability Zone as the directory bucket\n• Use VPC gateway endpoints to route S3 traffic over the AWS private network instead of the internet\n• Use Amazon S3 Mountpoint or S3A for file-system-style access in data processing frameworks\n\nData transfer between EC2 and S3 in the same Region is FREE and uses AWS private networking (no internet egress).",
      },
      {
        type: "quiz",
        question: "How should you optimize network data transfer costs when EC2 instances frequently access S3?",
        options: ["Place EC2 and S3 in the same Region and use a VPC gateway endpoint", "Use S3 Transfer Acceleration", "Place EC2 in a Region close to your users", "Use S3 Cross-Region Replication"],
        correctAnswer: "Place EC2 and S3 in the same Region and use a VPC gateway endpoint",
      },
    ],
  },
  {
    lessonId: "s3_lesson_92",
    title: "Request Parallelization in S3",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "software_development_engineer"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_87"],
    content: [
      {
        type: "text",
        text: "For large-scale S3 workloads, parallelize requests to maximize throughput:\n\n1. Parallel uploads – Use multipart upload with multiple parallel parts. AWS SDKs do this automatically for large objects.\n\n2. Parallel downloads – Use byte-range GET to split large file downloads across multiple threads or processes.\n\n3. Parallel listing – Use S3 List Objects with multiple simultaneous prefix queries to parallelize object enumeration at scale.\n\n4. Connection pooling – Reuse HTTP connections rather than opening a new TCP connection per request. AWS SDKs manage this automatically.",
      },
      {
        type: "quiz",
        question: "What technique allows you to parallelize the download of a single large S3 object across multiple threads?",
        options: ["Byte-range GET requests (splitting the download into ranges per thread)", "Enabling S3 Transfer Acceleration", "Using the S3 Select API", "Enabling S3 Express One Zone"],
        correctAnswer: "Byte-range GET requests (splitting the download into ranges per thread)",
      },
    ],
  },
  {
    lessonId: "s3_lesson_93",
    title: "S3 Performance Design Patterns",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "software_development_engineer"],
    durationSeconds: 300,
    difficulty: "hard",
    xpReward: 110,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_87", "s3_lesson_88"],
    content: [
      {
        type: "text",
        text: "Advanced S3 performance patterns:\n\n1. S3 as a data lake hot tier – Use S3 Standard for active data, with automated Lifecycle transitions to cheaper classes as data ages. Combine with Athena for query-in-place analytics.\n\n2. Optimistic concurrency with ETags – Read an object, store its ETag, write back with If-Match to prevent overwriting concurrent changes.\n\n3. Application-level caching metadata – Cache S3 object metadata (size, ETag, last modified) in ElastiCache to avoid HEAD requests before every GET.\n\n4. Fan-out pattern – Write once to S3, fan out processing via EventBridge or SQS to multiple consumers (Lambda functions, ECS tasks) simultaneously.\n\n5. S3 as a message bus – Store large event payloads in S3, pass the S3 URL via SQS/SNS to avoid message size limits.",
      },
      {
        type: "quiz",
        question: "What S3 design pattern allows you to process a newly uploaded object simultaneously with multiple different consumers?",
        options: ["Fan-out: trigger S3 Event Notifications to EventBridge, which routes to multiple targets", "Horizontal scaling with multiple prefixes", "Byte-range fetch from multiple threads", "S3 Select for parallel data extraction"],
        correctAnswer: "Fan-out: trigger S3 Event Notifications to EventBridge, which routes to multiple targets",
      },
    ],
  },

  // ============================================
  // S3 MODULE 10: STATIC WEBSITE HOSTING & ADVANCED USE CASES (7 lessons)
  // ============================================
  {
    lessonId: "s3_lesson_94",
    title: "Hosting a Static Website on S3",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "software_development_engineer", "cloud_administrator"],
    durationSeconds: 360,
    difficulty: "medium",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_12"],
    content: [
      {
        type: "text",
        text: "Amazon S3 can host static websites (HTML, CSS, JavaScript, images) without a web server. Steps to enable:\n\n1. Create a bucket with the same name as your domain (e.g., www.example.com)\n2. Disable Block Public Access settings\n3. Enable static website hosting in bucket settings\n4. Set an index document (e.g., index.html) and optional error document (e.g., error.html)\n5. Add a bucket policy granting s3:GetObject to everyone (*)\n6. (Optional) Configure a custom domain with Route 53 or add CNAME\n\nS3 website endpoint: {bucket-name}.s3-website-{region}.amazonaws.com",
      },
      {
        type: "quiz",
        question: "What is the minimum requirement for enabling public read access to a static website hosted in S3?",
        options: ["Disable Block Public Access and add a bucket policy granting s3:GetObject to everyone", "Enable S3 Transfer Acceleration", "Enable S3 Versioning on the bucket", "Configure an S3 Access Point"],
        correctAnswer: "Disable Block Public Access and add a bucket policy granting s3:GetObject to everyone",
      },
    ],
  },
  {
    lessonId: "s3_lesson_95",
    title: "S3 Website Endpoints vs REST Endpoints",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "software_development_engineer"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_94"],
    content: [
      {
        type: "text",
        text: "S3 provides two different endpoint types with different behaviors:\n\nWebsite endpoint: {bucket}.s3-website-{region}.amazonaws.com\n• Returns index documents for directory requests (e.g., / → index.html)\n• Returns custom error documents for 4xx errors\n• Supports redirects\n• Only supports HTTP (not HTTPS directly)\n• Does NOT support authenticated requests or ListBucket operations\n\nREST API endpoint: {bucket}.s3.{region}.amazonaws.com\n• Supports HTTPS\n• Supports all S3 API operations\n• Returns XML error responses (not custom HTML)\n• Required for authenticated requests and programmatic access",
      },
      {
        type: "quiz",
        question: "What key feature does the S3 website endpoint provide that the REST endpoint does NOT?",
        options: ["Returns index documents (index.html) for root directory requests", "Supports HTTPS connections", "Supports all S3 API operations", "Supports authenticated requests"],
        correctAnswer: "Returns index documents (index.html) for root directory requests",
      },
    ],
  },
  {
    lessonId: "s3_lesson_96",
    title: "Configuring S3 Website Redirects",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "software_development_engineer"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_94"],
    content: [
      {
        type: "text",
        text: "S3 website hosting supports routing rules (redirects) that you can configure in the bucket's website settings. Use cases:\n\n1. Redirect all traffic to another host – E.g., redirect non-www to www: configure a bucket for example.com to redirect all requests to www.example.com\n\n2. Conditional redirects – Redirect specific prefixes or HTTP error codes to different locations\n   Example: Redirect all 404 errors to /not-found.html\n\n3. Object-level redirect – Set a redirect on a specific S3 object using the x-amz-website-redirect-location metadata",
      },
      {
        type: "quiz",
        question: "How do you configure an S3 object to automatically redirect visitors to a different URL when accessed?",
        options: ["Set the x-amz-website-redirect-location metadata on the object", "Add a redirect rule in the bucket CORS configuration", "Configure an S3 Event Notification to trigger a Lambda redirect", "Update the bucket policy with a redirect condition"],
        correctAnswer: "Set the x-amz-website-redirect-location metadata on the object",
      },
    ],
  },
  {
    lessonId: "s3_lesson_97",
    title: "Serving S3 Static Websites via CloudFront",
    service: "s3",
    roles: ["solutions_architect", "application_architect", "software_development_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_89", "s3_lesson_94"],
    content: [
      {
        type: "text",
        text: "Serving a static S3 website through Amazon CloudFront adds several important capabilities:\n\n1. HTTPS support – CloudFront provides SSL/TLS termination with free AWS Certificate Manager (ACM) certificates\n2. Global performance – CloudFront caches content at 400+ edge locations worldwide\n3. Security – Use CloudFront Origin Access Control (OAC) to make S3 private (only accessible via CloudFront)\n4. Custom error pages – Configure CloudFront to return custom error pages\n5. WAF integration – Attach AWS WAF for application-layer security\n6. Cost reduction – CloudFront data transfer is cheaper than S3 data transfer at high volumes",
      },
      {
        type: "quiz",
        question: "What CloudFront feature ensures that your S3 bucket remains private and can only be accessed through CloudFront?",
        options: ["Origin Access Control (OAC)", "S3 Block Public Access", "CloudFront WAF rules", "CloudFront Signed URLs"],
        correctAnswer: "Origin Access Control (OAC)",
      },
    ],
  },
  {
    lessonId: "s3_lesson_98",
    title: "S3 as a Data Lake Foundation",
    service: "s3",
    roles: ["solutions_architect", "cloud_data_engineer", "application_architect"],
    durationSeconds: 300,
    difficulty: "hard",
    xpReward: 110,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_26", "s3_lesson_71"],
    content: [
      {
        type: "text",
        text: "Amazon S3 is the most commonly used foundation for data lakes on AWS due to its:\n• Unlimited scale and 11 nines durability\n• Support for all data formats (CSV, JSON, Parquet, ORC, Avro)\n• Query-in-place capability (Athena, Redshift Spectrum)\n• Integration with AWS analytics ecosystem (Glue, EMR, Lake Formation)\n• Cost-effective tiering (Standard → Standard-IA → Glacier)\n\nA typical S3 data lake architecture:\n• Raw zone: landing area for unmodified source data\n• Processed zone: cleaned, enriched, partitioned Parquet/ORC files\n• Curated zone: aggregated, query-ready datasets",
      },
      {
        type: "quiz",
        question: "Which S3 feature allows you to run SQL queries directly on data stored in S3 without ETL pipelines or a database?",
        options: ["Amazon Athena (query-in-place via S3)", "S3 Select (for single-object queries)", "S3 Metadata Tables", "All of the above provide query-in-place capabilities"],
        correctAnswer: "All of the above provide query-in-place capabilities",
      },
    ],
  },
  {
    lessonId: "s3_lesson_99",
    title: "S3 Security Best Practices",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator", "cloud_security_engineer"],
    durationSeconds: 360,
    difficulty: "hard",
    xpReward: 120,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_18", "s3_lesson_12", "s3_lesson_13"],
    content: [
      {
        type: "text",
        text: "AWS-recommended S3 security best practices:\n\n1. Block public access – Enable Block Public Access at the account level unless you have a specific need for public buckets.\n\n2. Enable encryption by default – SSE-S3 (minimum) or SSE-KMS for sensitive data.\n\n3. Enforce HTTPS – Use a bucket policy to deny HTTP requests (aws:SecureTransport = false).\n\n4. Enable Versioning + MFA Delete – Protect against accidental deletion.\n\n5. Use IAM roles (not user credentials) – Applications should use IAM roles. Never embed AWS access keys in code.\n\n6. Principle of least privilege – Grant only the specific S3 actions required by the requester.\n\n7. Enable CloudTrail – Log all S3 data events for audit purposes.\n\n8. Use IAM Access Analyzer – Regularly review bucket policies for unintended public or cross-account access.\n\n9. Enable VPC endpoints – Route S3 traffic over the private AWS network, not the internet.\n\n10. Enable S3 Object Lock for compliance – Use Compliance mode for regulatory data retention requirements.",
      },
      {
        type: "quiz",
        question: "What is the recommended way for an EC2 application to authenticate to S3, instead of using hardcoded AWS credentials?",
        options: ["Use an IAM role attached to the EC2 instance", "Store credentials in S3 and fetch them at startup", "Use AWS root account access keys", "Use an IAM user's long-term access keys in environment variables"],
        correctAnswer: "Use an IAM role attached to the EC2 instance",
      },
    ],
  },
  {
    lessonId: "s3_lesson_100",
    title: "S3 Compliance and Regulatory Considerations",
    service: "s3",
    roles: ["solutions_architect", "cloud_administrator", "cloud_security_engineer"],
    durationSeconds: 300,
    difficulty: "hard",
    xpReward: 120,
    isAdventure: false,
    prerequisiteLessons: ["s3_lesson_23", "s3_lesson_99"],
    content: [
      {
        type: "text",
        text: "Amazon S3 supports several compliance programs and certifications:\n• PCI DSS Level 1 – For handling credit card data\n• HIPAA – For healthcare data (requires a Business Associate Agreement with AWS)\n• SOC 1, 2, and 3 – For service organization controls\n• ISO 27001, 27017, 27018 – Information security standards\n• FedRAMP – For US federal government workloads\n\nKey S3 features for compliance:\n• S3 Object Lock (WORM) – SEC Rule 17a-4(f), FINRA\n• Encryption at rest and in transit – PCI DSS, HIPAA\n• CloudTrail audit logs – All compliance frameworks\n• Data residency via bucket Regions – GDPR, data sovereignty laws\n• S3 Replication for multi-Region copies – Business continuity requirements",
      },
      {
        type: "quiz",
        question: "Which S3 feature is most important for meeting SEC Rule 17a-4(f) requirements for financial records (WORM storage)?",
        options: ["S3 Object Lock in Compliance mode", "S3 Versioning with MFA Delete", "S3 Glacier Deep Archive", "S3 Cross-Region Replication"],
        correctAnswer: "S3 Object Lock in Compliance mode",
      },
      {
        type: "quiz",
        question: "Which mechanism in S3 helps satisfy data sovereignty requirements by ensuring data stays in a specific country?",
        options: ["Storing data in a bucket in the appropriate AWS Region (data never leaves the Region unless explicitly moved)", "Using S3 Block Public Access", "Enabling SSE-KMS with a customer-managed key", "Using S3 Transfer Acceleration"],
        correctAnswer: "Storing data in a bucket in the appropriate AWS Region (data never leaves the Region unless explicitly moved)",
      },
    ],
  },
];