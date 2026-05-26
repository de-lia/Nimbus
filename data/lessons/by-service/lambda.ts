import { Lesson } from "../../../types/lesson";

// Lambda Lessons - Comprehensive coverage from the AWS Lambda Developer Guide
// Organized into 10 modules across all major Lambda topics
// Module 1:  Fundamentals (10 lessons)
// Module 2:  Function Development (15 lessons)
// Module 3:  Configuring Functions (12 lessons)
// Module 4:  Invocation & Event Sources (12 lessons)
// Module 5:  Scaling & Concurrency (8 lessons)
// Module 6:  Security & Permissions (10 lessons)
// Module 7:  Monitoring, Logging & Tracing (10 lessons)
// Module 8:  Layers, Extensions & Runtimes (8 lessons)
// Module 9:  Advanced Features (8 lessons)
// Module 10: Best Practices (7 lessons)

export const lambdaLessons: Lesson[] = [
  // ============================================
  // LAMBDA MODULE 1: FUNDAMENTALS (10 lessons)
  // ============================================
  {
    lessonId: "lambda_lesson_1",
    title: "What is AWS Lambda?",
    service: "lambda",
    roles: ["software_development_engineer", "solutions_architect", "application_architect", "cloud_devops_engineer", "cloud_engineer", "cloud_administrator"],
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
    roles: ["software_development_engineer", "solutions_architect", "application_architect", "cloud_administrator", "cloud_engineer", "cloud_devops_engineer"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_1"],
    content: [
      {
        type: "text",
        text: "Serverless doesn't mean there are no servers — it means you don't have to think about them. AWS manages the infrastructure, and you focus on writing code. You pay only for the compute time you consume: measured in GB-seconds (memory × duration). There's no charge when your code isn't running.",
      },
      {
        type: "quiz",
        question: "In serverless computing, who manages the servers?",
        options: ["AWS manages them", "You manage them", "No one manages them", "Third-party vendors"],
        correctAnswer: "AWS manages them",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_3",
    title: "How Lambda Works: The Core Model",
    service: "lambda",
    roles: ["software_development_engineer", "solutions_architect", "application_architect", "cloud_engineer", "cloud_devops_engineer"],
    durationSeconds: 300,
    difficulty: "easy",
    xpReward: 60,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_1"],
    content: [
      {
        type: "text",
        text: "At its core, Lambda works like this:\n1. You write a function — a piece of code with a handler that Lambda calls when the function is invoked\n2. Lambda packages your function and runs it inside an execution environment (a secure, isolated container)\n3. An event (from a trigger like API Gateway, SQS, S3, etc.) invokes your function\n4. Lambda passes the event data to your handler, runs your code, and returns the result\n5. Lambda automatically manages the underlying infrastructure, scaling, and availability",
      },
      {
        type: "text",
        text: "Key Lambda concepts:\n• Function – Your code and its configuration\n• Handler – The entry point method Lambda calls\n• Event – The JSON document passed to your handler (contains trigger-specific data)\n• Context – An object with runtime information (request ID, remaining time, memory limit)\n• Execution environment – The isolated sandbox where your function runs\n• Runtime – The language environment (Node.js, Python, Java, Go, Ruby, .NET, etc.)",
      },
      {
        type: "quiz",
        question: "What object does Lambda pass to your handler that contains information like request ID and remaining execution time?",
        options: ["The context object", "The event object", "The runtime object", "The trigger object"],
        correctAnswer: "The context object",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_4",
    title: "Lambda Execution Environment Lifecycle",
    service: "lambda",
    roles: ["software_development_engineer", "solutions_architect", "cloud_engineer"],
    durationSeconds: 360,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_3"],
    content: [
      {
        type: "text",
        text: "A Lambda execution environment has three phases:\n\n1. Init phase (cold start) – Lambda downloads your code, starts the runtime, and runs initialization code outside your handler. This happens once when a new execution environment is created.\n\n2. Invoke phase – Lambda calls your handler with the event. Your handler runs and returns a response. After the invocation, the environment is frozen (not billed) and may be reused for future invocations.\n\n3. Shutdown phase – Lambda sends a SIGTERM signal (for graceful cleanup), then terminates the environment. Extensions can use this to flush buffers or close connections.",
      },
      {
        type: "quiz",
        question: "What is a 'cold start' in Lambda?",
        options: ["The Init phase where Lambda initializes a new execution environment for the first time", "When a function runs in a cold region", "When a function receives its first event", "When Lambda recycles an old execution environment"],
        correctAnswer: "The Init phase where Lambda initializes a new execution environment for the first time",
      },
      {
        type: "text",
        text: "Optimizing cold starts:\n• Move expensive initialization (SDK clients, DB connections, config loading) OUTSIDE the handler function so it runs once in the Init phase and is reused across invocations in the same environment\n• Use Lambda SnapStart (for Java, Python, .NET) to pre-initialize and snapshot the environment\n• Use Provisioned Concurrency to keep environments warm and eliminate cold starts entirely",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_5",
    title: "Lambda Function Handler",
    service: "lambda",
    roles: ["software_development_engineer", "application_architect", "cloud_engineer"],
    durationSeconds: 300,
    difficulty: "easy",
    xpReward: 60,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_3"],
    content: [
      {
        type: "text",
        text: "The handler is the entry point to your Lambda function — the method that Lambda calls when your function is invoked. Each runtime has its own handler naming conventions.",
      },
      {
        type: "code",
        code: `// Node.js handler example
export const handler = async (event, context) => {
  console.log('Event:', JSON.stringify(event));
  // Your logic here
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Lambda!' })
  };
};

# Python handler example
def handler(event, context):
    print(f"Event: {event}")
    # Your logic here
    return {
        'statusCode': 200,
        'body': '{"message": "Hello from Lambda!"}'
    }

// Java handler example
public class Handler implements RequestHandler<Map<String, String>, String> {
    @Override
    public String handleRequest(Map<String, String> event, Context context) {
        return "Hello from Lambda!";
    }
}`,
      },
      {
        type: "quiz",
        question: "In the Lambda console, how is the handler typically specified for a Node.js function?",
        options: ["filename.methodname (e.g., index.handler)", "ClassName::MethodName", "module:function", "handler.js only"],
        correctAnswer: "filename.methodname (e.g., index.handler)",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_6",
    title: "Events and Triggers",
    service: "lambda",
    roles: ["software_development_engineer", "solutions_architect", "application_architect", "cloud_engineer", "cloud_devops_engineer"],
    durationSeconds: 300,
    difficulty: "easy",
    xpReward: 60,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_3"],
    content: [
      {
        type: "text",
        text: "Lambda functions are invoked in response to events. A trigger is an AWS service or resource that invokes your function when something happens. Lambda supports two categories of invocation:\n\n1. Push (event-driven) – The service invokes Lambda directly\n   Examples: API Gateway HTTP request, S3 object upload, SNS message, EventBridge rule\n\n2. Poll-based (stream/queue) – Lambda polls the source and invokes your function in batches\n   Examples: SQS queue, DynamoDB Streams, Kinesis Data Streams, Kafka\n\nYou configure poll-based sources using Event Source Mappings.",
      },
      {
        type: "quiz",
        question: "Which of the following is a poll-based event source for Lambda?",
        options: ["Amazon SQS queue", "Amazon API Gateway", "Amazon S3", "Amazon SNS"],
        correctAnswer: "Amazon SQS queue",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_7",
    title: "Lambda Pricing Model",
    service: "lambda",
    roles: ["solutions_architect", "cloud_administrator", "software_development_engineer"],
    durationSeconds: 240,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_2"],
    content: [
      {
        type: "text",
        text: "Lambda pricing has three components:\n\n1. Requests – $0.20 per 1 million requests (first 1M free per month)\n2. Duration – Billed in 1ms increments based on GB-seconds (memory × time)\n   Formula: (memory in GB) × (duration in seconds) × price per GB-second\n3. Provisioned Concurrency – Additional charge for keeping environments initialized\n\nFree Tier (every month):\n• 1,000,000 free requests\n• 400,000 GB-seconds of compute time\n\nTip: You can reduce cost by choosing the right memory size. More memory = faster execution = fewer GB-seconds, so the optimal memory isn't always the minimum.",
      },
      {
        type: "quiz",
        question: "Lambda billing is calculated in what increments of duration?",
        options: ["1 millisecond increments", "100ms increments", "1 second increments", "100 microsecond increments"],
        correctAnswer: "1 millisecond increments",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_8",
    title: "Lambda Deployment Packages",
    service: "lambda",
    roles: ["software_development_engineer", "cloud_devops_engineer", "cloud_engineer"],
    durationSeconds: 240,
    difficulty: "easy",
    xpReward: 60,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_3"],
    content: [
      {
        type: "text",
        text: "Lambda supports two types of deployment packages:\n\n1. .zip file archive – A ZIP file containing your function code and dependencies. Limits:\n   • Unzipped: 250 MB maximum\n   • Zipped upload: 50 MB (direct), or up to 250 MB via S3\n   • You can use the built-in console code editor for small functions with no dependencies\n\n2. Container image – A Docker image stored in Amazon ECR. Limits:\n   • Up to 10 GB in size\n   • Must implement the Lambda Runtime Interface (use AWS base images or add the Runtime Interface Client)\n   • Supports OCI image format\n\nContainer images give you full control over the operating system, runtime, and dependencies.",
      },
      {
        type: "quiz",
        question: "What is the maximum size of a Lambda container image deployment?",
        options: ["10 GB", "250 MB", "50 MB", "1 GB"],
        correctAnswer: "10 GB",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_9",
    title: "Lambda Supported Runtimes",
    service: "lambda",
    roles: ["software_development_engineer", "solutions_architect", "cloud_engineer"],
    durationSeconds: 240,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_3"],
    content: [
      {
        type: "text",
        text: "Lambda supports the following managed runtimes (AWS maintains the runtime and applies security patches):\n\n• Node.js – node.js 22.x, node.js 20.x\n• Python – python 3.13, 3.12, 3.11, 3.10\n• Java – java 21, java 17, java 11, java 8\n• .NET – dotnet9, dotnet8\n• Ruby – ruby 3.3, 3.2\n• Go – go 1.x (uses provided.al2023)\n• Rust – via provided.al2023 custom runtime\n• PowerShell – via .NET runtime\n\nOS-only runtimes (provided.al2023, provided.al2): You supply your own runtime binary. Required for Go, Rust, and custom language runtimes.",
      },
      {
        type: "quiz",
        question: "What is an 'OS-only runtime' in Lambda (provided.al2023)?",
        options: ["A runtime where you supply your own language runtime binary", "A runtime that only supports operating system calls", "A runtime for system-level programming only", "An older deprecated runtime"],
        correctAnswer: "A runtime where you supply your own language runtime binary",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_10",
    title: "Lambda Runtime Deprecation Policy",
    service: "lambda",
    roles: ["software_development_engineer", "cloud_administrator", "cloud_devops_engineer"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 60,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_9"],
    content: [
      {
        type: "text",
        text: "AWS follows a runtime deprecation process when a language version reaches end-of-life:\n\nPhase 1 – Deprecation announced: AWS publishes the deprecation date. New function creation using the deprecated runtime is blocked. Existing functions continue to run.\n\nPhase 2 – Deprecated: Existing functions continue to run but you can no longer update them without changing the runtime. Lambda may apply security patches.\n\nShared responsibility model: AWS is responsible for runtime security patches. You are responsible for keeping your function code and dependencies secure, and migrating to non-deprecated runtimes before end-of-life.\n\nBest practice: Subscribe to the AWS Health Dashboard to receive runtime deprecation notifications. Enable automatic runtime updates in your function configuration.",
      },
      {
        type: "quiz",
        question: "Under the Lambda shared responsibility model, who is responsible for updating the managed runtime when a security patch is needed?",
        options: ["AWS is responsible for the managed runtime; you are responsible for your function code", "You are responsible for all security patches", "AWS is responsible for everything", "It depends on the programming language"],
        correctAnswer: "AWS is responsible for the managed runtime; you are responsible for your function code",
      },
    ],
  },

  // ============================================
  // LAMBDA MODULE 2: FUNCTION DEVELOPMENT (15 lessons)
  // ============================================
  {
    lessonId: "lambda_lesson_11",
    title: "Writing a Node.js Lambda Function",
    service: "lambda",
    roles: ["software_development_engineer", "application_architect"],
    durationSeconds: 360,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_5"],
    content: [
      {
        type: "text",
        text: "Node.js Lambda functions can use CommonJS (require/module.exports) or ES Modules (import/export). Lambda supports async/await handlers, which are the recommended pattern.",
      },
      {
        type: "code",
        code: `// Async handler (recommended)
export const handler = async (event, context) => {
  // context.getRemainingTimeInMillis() - ms before timeout
  // context.awsRequestId - unique invocation ID
  
  // Use global state for resources initialized once
  // (e.g., SDK clients, DB connections initialized outside handler)
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success', requestId: context.awsRequestId })
  };
};

// Accessing environment variables
const dbHost = process.env.DB_HOST;

// Global state - initialized once per execution environment
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
const client = new DynamoDBClient({}); // Created once, reused across invocations`,
      },
      {
        type: "quiz",
        question: "In Node.js Lambda, where should you initialize SDK clients (like DynamoDBClient) for best performance?",
        options: ["Outside the handler function, in global scope (runs once during Init phase)", "Inside the handler function (runs on every invocation)", "In a separate Lambda Layer", "In an environment variable"],
        correctAnswer: "Outside the handler function, in global scope (runs once during Init phase)",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_12",
    title: "Writing a Python Lambda Function",
    service: "lambda",
    roles: ["software_development_engineer", "application_architect", "cloud_data_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_5"],
    content: [
      {
        type: "code",
        code: `import json
import boto3
import os

# Global initialization - runs once during cold start
# Reused across multiple invocations in the same environment
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['TABLE_NAME'])

def handler(event, context):
    """
    Main handler function.
    
    Args:
        event: dict - The event data from the trigger
        context: LambdaContext - Runtime information
            context.aws_request_id - Unique request ID
            context.function_name - Lambda function name
            context.get_remaining_time_in_millis() - Time before timeout
    """
    print(f"Received event: {json.dumps(event)}")
    
    try:
        # Your logic here
        result = table.get_item(Key={'id': event.get('id')})
        return {
            'statusCode': 200,
            'body': json.dumps(result.get('Item', {}))
        }
    except Exception as e:
        print(f"Error: {str(e)}")
        raise`,
      },
      {
        type: "quiz",
        question: "In Python Lambda, which module should you use to access environment variables?",
        options: ["os.environ", "lambda.environ", "sys.env", "config.env"],
        correctAnswer: "os.environ",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_13",
    title: "Lambda Context Object",
    service: "lambda",
    roles: ["software_development_engineer", "cloud_engineer"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 70,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_5"],
    content: [
      {
        type: "text",
        text: "The context object provides runtime information about the current invocation. Key properties (consistent across all runtimes):\n\n• functionName – The name of the Lambda function\n• functionVersion – The version of the function ($LATEST or a number)\n• invokedFunctionArn – The ARN used to invoke the function (indicates if alias or version was used)\n• memoryLimitInMB – Memory configured for the function\n• awsRequestId – Unique identifier for the invocation request\n• logGroupName / logStreamName – CloudWatch log destination\n• getRemainingTimeInMillis() – Milliseconds before the function times out\n• identity / clientContext – Mobile SDK invocation data",
      },
      {
        type: "quiz",
        question: "Which context method allows you to detect if your Lambda function is about to time out?",
        options: ["context.getRemainingTimeInMillis()", "context.getTimeout()", "context.timeoutMs", "context.remainingMs"],
        correctAnswer: "context.getRemainingTimeInMillis()",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_14",
    title: "Environment Variables in Lambda",
    service: "lambda",
    roles: ["software_development_engineer", "cloud_devops_engineer", "cloud_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 70,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_3"],
    content: [
      {
        type: "text",
        text: "Environment variables let you adjust function behavior without changing code. Common uses: database connection strings, API endpoints, feature flags, and configuration settings.\n\nLambda provides several reserved environment variables you cannot set:\n• AWS_REGION – The Region where the function runs\n• AWS_LAMBDA_FUNCTION_NAME – The function name\n• AWS_LAMBDA_FUNCTION_VERSION – The function version\n• AWS_LAMBDA_FUNCTION_MEMORY_SIZE – Configured memory in MB\n• AWS_EXECUTION_ENV – The runtime identifier\n• LAMBDA_TASK_ROOT – The path to your function code\n• LAMBDA_RUNTIME_DIR – The path to runtime libraries",
      },
      {
        type: "text",
        text: "Securing environment variables:\n• By default, environment variables are encrypted at rest using AWS KMS with an AWS managed key (no extra cost)\n• For sensitive values (passwords, API keys), use AWS Secrets Manager or AWS Systems Manager Parameter Store instead of environment variables directly\n• You can encrypt environment variables with a customer-managed KMS key for additional control\n• Enable encryption helpers in the Lambda console to encrypt individual values before storing",
      },
      {
        type: "quiz",
        question: "What is the recommended way to store sensitive credentials (like database passwords) for a Lambda function?",
        options: ["AWS Secrets Manager or Parameter Store (not directly in environment variables)", "Directly in environment variables with KMS encryption", "Hardcoded in the function code", "In a Lambda Layer"],
        correctAnswer: "AWS Secrets Manager or Parameter Store (not directly in environment variables)",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_15",
    title: "Lambda Layers",
    service: "lambda",
    roles: ["software_development_engineer", "cloud_devops_engineer"],
    durationSeconds: 360,
    difficulty: "medium",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_8"],
    content: [
      {
        type: "text",
        text: "Lambda Layers are ZIP archives that contain supplementary code or data (libraries, custom runtimes, configuration files). Layers allow you to:\n• Share common dependencies across multiple functions without duplicating them\n• Keep your function deployment package small\n• Separate infrastructure/library code from business logic\n\nLayer limits:\n• A function can have up to 5 layers at once\n• Total unzipped size of function + layers must be ≤ 250 MB\n• Layer versions are immutable (create new versions for updates)\n• You can share layers with other AWS accounts or make them public",
      },
      {
        type: "text",
        text: "Layer paths by runtime — where Lambda places layer contents:\n• Node.js: /opt/nodejs/node_modules\n• Python: /opt/python\n• Java: /opt/java/lib\n• Ruby: /opt/ruby/gems\n• All runtimes: /opt (general files)\n\nThe PATH and language-specific library paths are automatically updated when you attach a layer.",
      },
      {
        type: "quiz",
        question: "What is the maximum number of layers that a single Lambda function can use at once?",
        options: ["5 layers", "10 layers", "3 layers", "Unlimited layers"],
        correctAnswer: "5 layers",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_16",
    title: "Lambda Function Versions",
    service: "lambda",
    roles: ["software_development_engineer", "cloud_devops_engineer", "solutions_architect"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_8"],
    content: [
      {
        type: "text",
        text: "Lambda versions let you manage deployment of your functions. Key concepts:\n\n• $LATEST – The unpublished, mutable version of your function. Every code change updates $LATEST.\n• Published version – An immutable snapshot of your function (code + most configuration). Published versions have a number (1, 2, 3...) and cannot be modified after creation.\n• Lambda never reuses version numbers, even after you delete and recreate a function.\n\nWhat's immutable after publishing: code, runtime, architecture, memory, layers, timeout, VPC config, handler, environment variables.\nWhat can still change on a published version: triggers, destinations, provisioned concurrency.",
      },
      {
        type: "quiz",
        question: "What happens to the $LATEST version when you deploy updated function code?",
        options: ["$LATEST is always overwritten with the new code", "$LATEST is preserved and a new numbered version is created automatically", "$LATEST becomes read-only", "A new $LATEST2 is created"],
        correctAnswer: "$LATEST is always overwritten with the new code",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_17",
    title: "Lambda Aliases and Weighted Traffic",
    service: "lambda",
    roles: ["software_development_engineer", "cloud_devops_engineer", "solutions_architect"],
    durationSeconds: 360,
    difficulty: "medium",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_16"],
    content: [
      {
        type: "text",
        text: "A Lambda alias is a pointer (named reference) to a specific function version. Aliases have their own ARN and allow you to:\n• Give meaningful names to versions (e.g., 'live', 'beta', 'prod')\n• Update event sources and triggers to point to an alias instead of a version number\n• Create stable ARNs that don't change even when you publish new versions\n\nWeighted aliases (traffic shifting):\nYou can split traffic between two versions using a weighted alias. For example:\n• Version 1: 95% of traffic\n• Version 2: 5% of traffic (canary deployment)\n\nThis enables blue/green and canary deployments without changing any calling code.",
      },
      {
        type: "code",
        code: `# AWS CLI: Create a weighted alias for canary deployment
aws lambda update-alias \\
  --function-name my-function \\
  --name live \\
  --function-version 1 \\
  --routing-config AdditionalVersionWeights={"2"=0.05}
# Routes 5% of traffic to version 2, 95% to version 1

# Promote version 2 to receive all traffic
aws lambda update-alias \\
  --function-name my-function \\
  --name live \\
  --function-version 2 \\
  --routing-config AdditionalVersionWeights={}`,
      },
      {
        type: "quiz",
        question: "What is the purpose of a Lambda alias?",
        options: ["A stable named pointer to a specific function version, enabling traffic shifting and decoupled deployments", "An alternate name for the function itself", "A way to share functions with other AWS accounts", "A backup copy of the function"],
        correctAnswer: "A stable named pointer to a specific function version, enabling traffic shifting and decoupled deployments",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_18",
    title: "Lambda SnapStart",
    service: "lambda",
    roles: ["software_development_engineer", "solutions_architect"],
    durationSeconds: 300,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_4"],
    content: [
      {
        type: "text",
        text: "Lambda SnapStart dramatically reduces cold start latency for supported runtimes (Java, Python, .NET) by pre-initializing the execution environment and caching the initialized state as a snapshot.\n\nHow it works:\n1. When you publish a new function version with SnapStart enabled, Lambda runs your initialization code\n2. Lambda takes a snapshot (a memory and disk image) of the initialized execution environment\n3. On cold start, Lambda restores the environment from this cached snapshot instead of re-running initialization\n4. This can reduce cold start latency by up to 90% for Java functions\n\nSnapStart is free — you only pay for the function execution time, not for snapshot creation.",
      },
      {
        type: "text",
        text: "SnapStart compatibility considerations:\n• Avoid saving state in snapshots that's unique per invocation (e.g., random seeds, timestamps, network connections)\n• Use runtime hooks (beforeCheckpoint / afterRestore) to re-initialize resources that need to be fresh after restore\n• Use CSPRNGs (Cryptographically Secure Pseudo-Random Number Generators) instead of seeding random number generators at init time\n• Network connections established during initialization will be stale after restore — use runtime hooks to reconnect",
      },
      {
        type: "quiz",
        question: "Why must you avoid saving unique per-invocation state in a SnapStart snapshot?",
        options: ["Because the snapshot is shared across all invocations — state like unique random seeds would be the same for every invocation that restores from it", "Because snapshots have a size limit", "Because snapshots are not encrypted", "Because AWS doesn't support unique state"],
        correctAnswer: "Because the snapshot is shared across all invocations — state like unique random seeds would be the same for every invocation that restores from it",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_19",
    title: "Response Streaming",
    service: "lambda",
    roles: ["software_development_engineer", "application_architect"],
    durationSeconds: 300,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_5"],
    content: [
      {
        type: "text",
        text: "Lambda response streaming lets functions return partial responses to clients before the full execution completes, improving time-to-first-byte (TTFB) for latency-sensitive applications.\n\nBenefits:\n• Send partial results as they become available (e.g., AI-generated text, large data export)\n• Return payloads up to 200 MB (vs 6 MB for buffered responses)\n• Reduce memory needed since the full response doesn't need to fit in memory\n\nCurrent support:\n• Available in Node.js managed runtimes natively\n• Other languages can use the Lambda Web Adapter or a custom Runtime API integration\n• Works via Lambda Function URLs and the InvokeWithResponseStream API\n• Not available through the Lambda console test feature (always buffered in console)",
      },
      {
        type: "quiz",
        question: "What is the maximum response payload size when using Lambda response streaming?",
        options: ["200 MB", "6 MB", "10 MB", "Unlimited"],
        correctAnswer: "200 MB",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_20",
    title: "Ephemeral Storage and File System Access",
    service: "lambda",
    roles: ["software_development_engineer", "solutions_architect"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 70,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_3"],
    content: [
      {
        type: "text",
        text: "Lambda provides two ways to work with files:\n\n1. /tmp ephemeral storage – A local writable directory available during function execution:\n   • Default: 512 MB, configurable up to 10 GB\n   • Persists within a single execution environment (shared between warm invocations)\n   • NOT shared between concurrent executions\n   • Good for: caching downloaded files, temporary processing, unpacking archives\n   • Free up to 512 MB; additional storage charged per GB-second\n\n2. Amazon EFS (Elastic File System) – Mount a persistent shared file system:\n   • Requires VPC configuration (EFS lives in your VPC)\n   • Shared across all invocations and functions with the same mount point\n   • Good for: machine learning models, shared reference data, stateful workloads",
      },
      {
        type: "quiz",
        question: "What is the maximum configurable size of Lambda's /tmp ephemeral storage?",
        options: ["10 GB", "512 MB", "1 GB", "250 MB"],
        correctAnswer: "10 GB",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_21",
    title: "Working with the Lambda SDK",
    service: "lambda",
    roles: ["software_development_engineer", "application_architect"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 70,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_5"],
    content: [
      {
        type: "text",
        text: "Lambda runtimes include a version of the AWS SDK, but it may not be the latest. Best practices:\n\n• For the latest SDK features and security patches, bundle your own SDK version in your deployment package\n• Use the AWS SDK v3 (JavaScript) or Boto3 (Python) — they support tree-shaking and modular imports\n• SDK clients should be initialized once outside your handler (global scope) and reused across invocations to benefit from connection pooling and keep-alive\n\nNode.js SDK v3 tip: Lambda includes a specific version of the AWS SDK in the runtime. To use the latest version, add it to your package.json dependencies and bundle it in your deployment package.",
      },
      {
        type: "code",
        code: `// Node.js - Initialize SDK client outside handler (GOOD)
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

// Created once, reused across warm invocations
const s3 = new S3Client({ region: process.env.AWS_REGION });

export const handler = async (event) => {
  const response = await s3.send(new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: event.key,
  }));
  return response;
};`,
      },
      {
        type: "quiz",
        question: "Why should you initialize AWS SDK clients outside the Lambda handler function?",
        options: ["To benefit from connection reuse across warm invocations, reducing latency", "Because SDK clients cannot be created inside functions", "To avoid paying for SDK initialization", "To comply with AWS security policies"],
        correctAnswer: "To benefit from connection reuse across warm invocations, reducing latency",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_22",
    title: "Lambda Durable Functions",
    service: "lambda",
    roles: ["software_development_engineer", "solutions_architect", "application_architect"],
    durationSeconds: 360,
    difficulty: "hard",
    xpReward: 110,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_3"],
    content: [
      {
        type: "text",
        text: "Lambda Durable Functions enable long-running, fault-tolerant, stateful workflows inside Lambda — without managing external orchestration services. Key capabilities:\n• Automatic checkpointing: progress is saved after each step\n• Replay: if interrupted, the function resumes from the last checkpoint\n• Wait states: pause for hours or days without incurring compute charges\n• Callbacks: wait for external systems to provide input before continuing\n• Parallel execution: run multiple steps concurrently with concurrency control",
      },
      {
        type: "text",
        text: "The DurableContext SDK wraps your handler and provides operations:\n• context.step() – Execute business logic with automatic checkpointing and configurable retries\n• context.wait() – Pause execution for a specified duration (terminates invocation, no compute charges)\n• context.createCallback() – Pause and wait for an external system to submit a result\n• context.parallel() – Execute multiple steps concurrently\n\nDurable functions are best for: order processing workflows, human-in-the-loop approvals, data pipelines, and any process that may take minutes-to-days.",
      },
      {
        type: "quiz",
        question: "When a Lambda durable function calls context.wait() for 1 hour, are you charged for compute during the wait?",
        options: ["No — the invocation terminates and resumes later, so no compute is billed during the wait", "Yes — compute is billed for the entire wait duration", "Yes — but at a reduced rate", "No — but storage is billed for checkpoint data"],
        correctAnswer: "No — the invocation terminates and resumes later, so no compute is billed during the wait",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_23",
    title: "Lambda Function URLs",
    service: "lambda",
    roles: ["software_development_engineer", "solutions_architect", "application_architect"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_6"],
    content: [
      {
        type: "text",
        text: "Lambda Function URLs give your function a dedicated HTTPS endpoint — without needing API Gateway. The URL format is:\nhttps://{url-id}.lambda-url.{region}.on.aws\n\nFunction URLs support:\n• Synchronous invocations only\n• CORS configuration\n• Request/response payloads up to 6 MB (buffered) or 20 MB request + 200 MB response (streaming)\n• Two auth types: AWS_IAM (requires signed requests) or NONE (public, no auth required)\n\nWhen to use Function URLs vs API Gateway:\n• Function URLs: single-function endpoints, webhooks, simple REST APIs, response streaming\n• API Gateway: complex routing, request validation, usage plans, throttling per endpoint, multiple Lambda backends, WebSocket APIs",
      },
      {
        type: "quiz",
        question: "What are the two authentication types available for Lambda Function URLs?",
        options: ["AWS_IAM (signed requests required) and NONE (public access)", "API_KEY and OAuth2", "JWT and SAML", "Basic Auth and Bearer Token"],
        correctAnswer: "AWS_IAM (signed requests required) and NONE (public access)",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_24",
    title: "Testing Lambda Functions",
    service: "lambda",
    roles: ["software_development_engineer", "cloud_devops_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_5"],
    content: [
      {
        type: "text",
        text: "Lambda testing strategies from fastest to most realistic:\n\n1. Unit tests with mocks – Test business logic in isolation with mocked AWS service calls. Fastest feedback loop, no AWS costs.\n\n2. Local testing with AWS SAM CLI – Run your Lambda function locally using `sam local invoke`. Simulates the Lambda runtime environment. Supports event injection and step-through debugging.\n\n3. Testing in the cloud – Deploy to a dev/test environment and invoke with real events. Most accurate. Lambda console supports private test events and shareable test event schemas.\n\n4. Integration testing – Test the complete event flow (e.g., SQS → Lambda → DynamoDB) in a cloud test environment.",
      },
      {
        type: "quiz",
        question: "Which Lambda testing strategy provides the most accurate representation of how your function will behave in production?",
        options: ["Testing in the cloud with real AWS services", "Unit tests with mocked services", "Local testing with SAM CLI", "Testing with emulators"],
        correctAnswer: "Testing in the cloud with real AWS services",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_25",
    title: "Infrastructure as Code for Lambda",
    service: "lambda",
    roles: ["software_development_engineer", "solutions_architect", "cloud_devops_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_3"],
    content: [
      {
        type: "text",
        text: "Lambda functions should be deployed using Infrastructure as Code (IaC) for repeatability, version control, and automated deployments. Main IaC options:\n\n1. AWS SAM (Serverless Application Model) – Lambda-specific extension of CloudFormation. Simplified syntax for functions, APIs, event sources. Use `sam build` and `sam deploy`.\n\n2. AWS CDK (Cloud Development Kit) – Define infrastructure using TypeScript, Python, Java, or C#. More flexible than SAM. Generates CloudFormation.\n\n3. AWS CloudFormation – Low-level JSON/YAML templates. Maximum control but verbose.\n\n4. Terraform – Popular cross-cloud IaC tool with strong Lambda support.",
      },
      {
        type: "code",
        code: `# AWS SAM template example
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31

Resources:
  MyFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: index.handler
      Runtime: nodejs22.x
      MemorySize: 256
      Timeout: 30
      Environment:
        Variables:
          TABLE_NAME: !Ref MyTable
      Events:
        ApiEvent:
          Type: Api
          Properties:
            Path: /items
            Method: GET
      Policies:
        - DynamoDBReadPolicy:
            TableName: !Ref MyTable`,
      },
      {
        type: "quiz",
        question: "What AWS tool simplifies deploying Lambda functions using a shorthand YAML syntax that extends CloudFormation?",
        options: ["AWS SAM (Serverless Application Model)", "AWS CDK", "AWS CodeDeploy", "AWS Elastic Beanstalk"],
        correctAnswer: "AWS SAM (Serverless Application Model)",
      },
    ],
  },

  // ============================================
  // LAMBDA MODULE 3: CONFIGURING FUNCTIONS (12 lessons)
  // ============================================
  {
    lessonId: "lambda_lesson_26",
    title: "Memory and CPU Configuration",
    service: "lambda",
    roles: ["software_development_engineer", "solutions_architect", "cloud_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_7"],
    content: [
      {
        type: "text",
        text: "Lambda allocates CPU power proportionally to the memory you configure. There's no separate CPU setting — more memory = more CPU.\n\nMemory range: 128 MB to 10,240 MB (10 GB), in 1 MB increments\n\nCPU allocation:\n• 1 vCPU at 1,769 MB\n• 2 vCPUs at 3,538 MB\n• 6 vCPUs at 10,240 MB\n\nPerformance tip: For CPU-bound workloads (data processing, image compression), increasing memory can significantly reduce duration, which may lower the overall cost despite a higher per-GB-second rate. Always measure with the Lambda Power Tuning tool.",
      },
      {
        type: "quiz",
        question: "In Lambda, how do you increase the CPU power available to your function?",
        options: ["Increase the memory setting (CPU is allocated proportionally to memory)", "Set a separate CPU configuration", "Use a faster runtime language", "Enable provisioned concurrency"],
        correctAnswer: "Increase the memory setting (CPU is allocated proportionally to memory)",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_27",
    title: "Function Timeout",
    service: "lambda",
    roles: ["software_development_engineer", "cloud_engineer"],
    durationSeconds: 240,
    difficulty: "easy",
    xpReward: 60,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_3"],
    content: [
      {
        type: "text",
        text: "Lambda timeout controls the maximum duration a function can run:\n• Default: 3 seconds\n• Maximum: 15 minutes (900 seconds)\n• After timeout, Lambda terminates the function and reports a timeout error\n\nBest practices:\n• Set timeout to slightly more than your function's expected maximum duration (add a buffer)\n• For long-running workloads (>15 minutes), use Step Functions, Lambda Durable Functions, or break the work into smaller functions\n• Use context.getRemainingTimeInMillis() to detect approaching timeouts and handle gracefully\n• Monitor timeout errors in CloudWatch using the Errors and Throttles metrics",
      },
      {
        type: "quiz",
        question: "What is the maximum timeout you can configure for a Lambda function?",
        options: ["15 minutes (900 seconds)", "1 hour", "5 minutes", "30 minutes"],
        correctAnswer: "15 minutes (900 seconds)",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_28",
    title: "Architecture: ARM64 vs x86_64",
    service: "lambda",
    roles: ["software_development_engineer", "solutions_architect"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 70,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_8"],
    content: [
      {
        type: "text",
        text: "Lambda supports two instruction set architectures:\n\n• x86_64 – Traditional architecture, default for Lambda functions\n• arm64 (Graviton2) – AWS's custom ARM processors:\n   - Up to 20% better price-performance than x86_64\n   - Lower compute cost (roughly 20% cheaper per GB-second)\n   - Runs Linux-based workloads well\n   - Requires recompiling native binaries for arm64\n\nWhen to use arm64:\n• General-purpose web/API functions (great price-performance)\n• Functions with no architecture-specific native libraries\n• Any function where you can easily test and validate on arm64\n\nStick with x86_64 when:\n• You have native dependencies compiled only for x86\n• You use Docker images built only for x86",
      },
      {
        type: "quiz",
        question: "What is the primary benefit of using arm64 (Graviton2) architecture for Lambda?",
        options: ["Up to 20% better price-performance compared to x86_64", "Faster cold starts", "Higher maximum memory", "Better Python performance specifically"],
        correctAnswer: "Up to 20% better price-performance compared to x86_64",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_29",
    title: "Connecting Lambda to a VPC",
    service: "lambda",
    roles: ["solutions_architect", "cloud_engineer", "cloud_administrator", "cloud_security_engineer"],
    durationSeconds: 360,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_3"],
    content: [
      {
        type: "text",
        text: "By default, Lambda functions run in a Lambda-managed VPC and have access to the internet but NOT to resources in your private VPC (like RDS, ElastiCache, or EC2 in private subnets).\n\nTo connect Lambda to your VPC:\n1. Configure the function with one or more subnets and a security group from your VPC\n2. Lambda creates Hyperplane ENIs (Elastic Network Interfaces) in your subnets to route traffic\n3. Lambda assumes an IAM role with the AWSLambdaVPCAccessExecutionRole managed policy\n\nRequired IAM permissions for VPC-connected functions:\n• ec2:CreateNetworkInterface\n• ec2:DescribeNetworkInterfaces\n• ec2:DeleteNetworkInterface",
      },
      {
        type: "text",
        text: "VPC + Internet access:\nWhen you connect a Lambda function to your VPC, it LOSES internet access (unless you add NAT). Options for internet access:\n\n1. NAT Gateway in a public subnet (most common) – Put Lambda in private subnet, add a route through NAT Gateway\n2. VPC endpoints – Access AWS services (S3, DynamoDB, etc.) directly without internet via PrivateLink\n3. Public subnet + elastic IP – Lambda in a public subnet can reach the internet but ENIs don't automatically get public IPs\n\nBest practice: Use VPC endpoints for AWS services to reduce NAT Gateway costs and keep traffic on the AWS backbone.",
      },
      {
        type: "quiz",
        question: "When you connect a Lambda function to your VPC, what happens to its internet access?",
        options: ["It loses internet access unless you route traffic through a NAT Gateway", "It gains faster internet access through the VPC", "Nothing changes — it retains full internet access", "It can only access services in the same VPC"],
        correctAnswer: "It loses internet access unless you route traffic through a NAT Gateway",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_30",
    title: "Lambda Function States",
    service: "lambda",
    roles: ["software_development_engineer", "cloud_engineer"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 70,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_3"],
    content: [
      {
        type: "text",
        text: "Lambda functions move through different states based on their configuration changes:\n\n• Active – Function is ready to be invoked\n• Pending – Lambda is working on a function update (e.g., attaching to a VPC, updating code). Invocations during Pending may fail.\n• Inactive – Function has not been invoked for an extended period (Lambda reclaims resources). The next invocation triggers initialization.\n• Failed – A configuration update failed. Function may not be invocable.\n\nDuring deployments, use function state checks to verify the function is Active before routing traffic, especially in CI/CD pipelines.",
      },
      {
        type: "quiz",
        question: "What state is a Lambda function in when Lambda is processing a configuration update (e.g., attaching to a VPC)?",
        options: ["Pending", "Active", "Initializing", "Updating"],
        correctAnswer: "Pending",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_31",
    title: "Recursive Loop Detection",
    service: "lambda",
    roles: ["software_development_engineer", "cloud_administrator"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_6"],
    content: [
      {
        type: "text",
        text: "A recursive Lambda loop happens when a function is triggered by a resource it also writes to — creating an infinite cycle that rapidly consumes concurrency and incurs unexpected charges.\n\nExample: A Lambda function triggered by an S3 ObjectCreated event writes a new object to the same S3 bucket → triggers itself again → infinite loop.\n\nLambda's recursive loop detection:\n• Lambda detects recursive loops involving SQS, S3, and SNS\n• When Lambda detects more than ~16 recursive invocations in a chain, it stops the next invocation and sends an alert via the Health Dashboard and email\n• The CloudWatch metric RecursiveInvocationsDropped tracks stopped invocations",
      },
      {
        type: "quiz",
        question: "What should you do FIRST when Lambda stops a recursive loop in your function?",
        options: ["Reduce the function's concurrency to zero to prevent further invocations, then fix the code defect", "Delete the function and redeploy", "Increase the function timeout", "Enable X-Ray tracing to diagnose the loop"],
        correctAnswer: "Reduce the function's concurrency to zero to prevent further invocations, then fix the code defect",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_32",
    title: "Tags for Lambda Functions",
    service: "lambda",
    roles: ["solutions_architect", "cloud_administrator"],
    durationSeconds: 180,
    difficulty: "easy",
    xpReward: 50,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_3"],
    content: [
      {
        type: "text",
        text: "Lambda supports tags (key-value pairs) at the function level. Tags are NOT part of the published version snapshot and don't affect function behavior.\n\nCommon tag use cases:\n• Cost allocation – Tag by team, project, or environment to track Lambda costs in billing reports\n• ABAC (Attribute-Based Access Control) – Use tags in IAM policies to control access\n• Filtering – Filter functions in the Lambda console by tag key/value\n\nNote: Tags apply to functions only, not to individual versions or aliases. Permissions required: lambda:TagResource, lambda:UntagResource, lambda:ListTags.",
      },
      {
        type: "quiz",
        question: "Do Lambda function tags apply to individual published versions and aliases?",
        options: ["No — tags apply to the function level only, not individual versions or aliases", "Yes — tags are copied to every published version", "Yes — but only if you specify during publish", "No — tags are not supported on Lambda at all"],
        correctAnswer: "No — tags apply to the function level only, not individual versions or aliases",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_33",
    title: "Lambda Metadata Endpoint",
    service: "lambda",
    roles: ["software_development_engineer"],
    durationSeconds: 180,
    difficulty: "hard",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_3"],
    content: [
      {
        type: "text",
        text: "Lambda provides a metadata endpoint that lets your function discover runtime information including its Availability Zone ID. This is useful for:\n• Routing requests to resources in the same AZ to reduce latency\n• Tracking which AZ a function is executing in for observability\n\nThe endpoint is available at:\nhttp://localhost:9001/2025-01-01/metadata/az\n\nReturns an AZ ID (e.g., 'use1-az1'), which is a unique consistent identifier across AWS accounts — unlike AZ names (e.g., 'us-east-1a') which vary between accounts. This allows you to co-locate Lambda with databases or caches in the same AZ.",
      },
      {
        type: "quiz",
        question: "Why is the AZ ID (from the Lambda metadata endpoint) more useful than the AZ name for cross-account coordination?",
        options: ["AZ IDs are consistent across AWS accounts; AZ names map to different physical zones per account", "AZ IDs are shorter and easier to use", "AZ names are deprecated", "AZ IDs include Region information"],
        correctAnswer: "AZ IDs are consistent across AWS accounts; AZ names map to different physical zones per account",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_34",
    title: "Lambda Container Image Deployment",
    service: "lambda",
    roles: ["software_development_engineer", "cloud_devops_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_8"],
    content: [
      {
        type: "text",
        text: "Lambda supports packaging functions as container images stored in Amazon ECR (Elastic Container Registry). Container images offer:\n• Up to 10 GB image size\n• Full OS control (bring your own libraries, OS packages)\n• Familiar Docker tooling\n• Consistent local development and production environments\n\nRequirements for container images:\n• Must implement the Lambda Runtime Interface (handle invocation events via the Runtime API)\n• Use AWS base images (include the Runtime Interface Client automatically) OR\n• Add the Runtime Interface Client (RIC) to a non-AWS base image\n• Must respond to signals (SIGTERM for graceful shutdown)",
      },
      {
        type: "code",
        code: "# Dockerfile using AWS base image (Node.js)\nFROM public.ecr.aws/lambda/nodejs:22\n\n# Copy function code\nCOPY index.mjs ${LAMBDA_TASK_ROOT}/\n\n# Set the CMD to your handler\nCMD [\"index.handler\"]\n\n# Build and push to ECR:\n# docker build -t my-lambda-function .\n# aws ecr get-login-password | docker login --username AWS --password-stdin <account>.dkr.ecr.<region>.amazonaws.com\n# docker tag my-lambda-function:latest <account>.dkr.ecr.<region>.amazonaws.com/my-repo:latest\n# docker push <account>.dkr.ecr.<region>.amazonaws.com/my-repo:latest",
      },
      {
        type: "quiz",
        question: "What does a Lambda container image need to implement to handle invocation events?",
        options: ["The Lambda Runtime Interface (via Runtime Interface Client)", "A standard HTTP server on port 8080", "An SQS message listener", "A custom webhook handler"],
        correctAnswer: "The Lambda Runtime Interface (via Runtime Interface Client)",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_35",
    title: "Asynchronous Invocation and Destinations",
    service: "lambda",
    roles: ["software_development_engineer", "solutions_architect"],
    durationSeconds: 360,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_6"],
    content: [
      {
        type: "text",
        text: "When Lambda invokes a function asynchronously (e.g., from SNS, EventBridge, or direct async invoke), Lambda queues the event internally and handles retries automatically:\n\n• Lambda retries failed async invocations up to 2 times by default (3 total attempts)\n• Between retries: 1 minute after first failure, then 2 minutes\n• You can configure: maximum retry attempts (0-2) and maximum event age (60 seconds to 6 hours)\n• Events that exhaust retries go to a dead-letter queue (DLQ) or a destination",
      },
      {
        type: "text",
        text: "Lambda Destinations (preferred over DLQs) send invocation records to a destination based on success or failure:\n\n• On-success destinations: SQS, SNS, Lambda, EventBridge\n• On-failure destinations: SQS, SNS, Lambda, EventBridge\n\nDestinations include the full invocation record (event, response, request ID, error details) — richer than a DLQ which only receives the failed payload. Configure both success and failure destinations for full observability of async invocations.",
      },
      {
        type: "quiz",
        question: "What is the key advantage of Lambda Destinations over Dead Letter Queues (DLQs)?",
        options: ["Destinations include the full invocation record (event + response + error), while DLQs only contain the failed payload", "Destinations are cheaper than DLQs", "Destinations support more message protocols", "DLQs are no longer supported"],
        correctAnswer: "Destinations include the full invocation record (event + response + error), while DLQs only contain the failed payload",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_36",
    title: "Synchronous vs Asynchronous Invocation",
    service: "lambda",
    roles: ["software_development_engineer", "solutions_architect", "application_architect"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_35"],
    content: [
      {
        type: "text",
        text: "Lambda has two core invocation modes:\n\nSynchronous (RequestResponse):\n• Caller waits for the function to complete and receives the response\n• Examples: API Gateway, ALB, Function URLs, direct SDK invoke\n• Errors are returned directly to the caller — caller must handle retries\n• Maximum payload: 6 MB request/response\n\nAsynchronous (Event):\n• Caller sends the event and immediately gets a 202 Accepted response\n• Lambda queues the event and handles retries automatically (up to 2 retries)\n• Examples: S3, SNS, EventBridge, async SDK invoke\n• Maximum payload: 256 KB",
      },
      {
        type: "quiz",
        question: "In synchronous Lambda invocation, who is responsible for handling retries if the function fails?",
        options: ["The caller — Lambda does not retry on synchronous failures", "Lambda automatically retries up to 3 times", "AWS manages retries transparently", "Retries depend on the runtime"],
        correctAnswer: "The caller — Lambda does not retry on synchronous failures",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_37",
    title: "Lambda Quotas and Limits",
    service: "lambda",
    roles: ["solutions_architect", "cloud_administrator", "software_development_engineer"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 70,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_3"],
    content: [
      {
        type: "text",
        text: "Key Lambda quotas (per Region, per account):\n\nFunction configuration:\n• Memory: 128 MB – 10,240 MB\n• Timeout: 1 second – 15 minutes\n• Deployment package (.zip): 50 MB zipped, 250 MB unzipped\n• Container image: 10 GB\n• Environment variables: 4 KB total\n• Layers: 5 per function (250 MB total unzipped)\n• /tmp storage: 512 MB – 10 GB\n\nConcurrency:\n• Default account concurrency: 1,000 concurrent executions (soft limit, can be increased)\n• Burst scaling: 500-3,000 initial burst depending on Region\n• Reserved concurrency does not add to the account limit",
      },
      {
        type: "quiz",
        question: "What is the default account-level Lambda concurrency limit?",
        options: ["1,000 concurrent executions (soft limit, can be increased via AWS Support)", "100 concurrent executions", "Unlimited concurrent executions", "10,000 concurrent executions"],
        correctAnswer: "1,000 concurrent executions (soft limit, can be increased via AWS Support)",
      },
    ],
  },

  // ============================================
  // LAMBDA MODULE 4: INVOCATION & EVENT SOURCES (12 lessons)
  // ============================================
  {
    lessonId: "lambda_lesson_38",
    title: "Event Source Mappings",
    service: "lambda",
    roles: ["software_development_engineer", "solutions_architect", "cloud_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_6"],
    content: [
      {
        type: "text",
        text: "An Event Source Mapping (ESM) is a Lambda resource that reads from a stream or queue and invokes your function. Lambda manages the polling and batching on your behalf.\n\nSupported ESM sources:\n• Amazon SQS – Lambda polls the queue and invokes with batches of messages\n• Amazon Kinesis Data Streams – Lambda polls shards and processes records in order\n• Amazon DynamoDB Streams – Lambda processes change records from DynamoDB tables\n• Amazon MSK (Managed Streaming for Apache Kafka)\n• Self-managed Apache Kafka\n• Amazon MQ (ActiveMQ, RabbitMQ)\n• Amazon DocumentDB\n\nKey batching settings:\n• BatchSize – Maximum records per Lambda invocation (1 to 10,000 depending on source)\n• MaximumBatchingWindowInSeconds – Wait up to N seconds to fill a batch before invoking",
      },
      {
        type: "quiz",
        question: "With an Event Source Mapping, who is responsible for polling the SQS queue?",
        options: ["Lambda — it polls on your behalf and invokes your function with batches", "Your function code polls the queue", "SQS pushes events directly to Lambda", "You must configure a CloudWatch Events rule"],
        correctAnswer: "Lambda — it polls on your behalf and invokes your function with batches",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_39",
    title: "Lambda with SQS",
    service: "lambda",
    roles: ["software_development_engineer", "solutions_architect", "application_architect"],
    durationSeconds: 360,
    difficulty: "medium",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_38"],
    content: [
      {
        type: "text",
        text: "SQS is one of the most common Lambda event sources. Key behaviors:\n\n• Lambda polls the queue using long polling (20-second wait)\n• Standard queues: Lambda scales up to 1,000 concurrent executions, adding 60 per minute\n• FIFO queues: Lambda scales up to the number of active message groups (MessageGroupId)\n• MaxConcurrency setting: caps the maximum concurrent Lambda invocations from this ESM\n• Lambda deletes messages from the queue only after successful function completion\n• On failure: messages become visible again (respect the queue's visibility timeout)\n\nPartial batch response:\nFor batches with mixed success/failure, return a batchItemFailures response to prevent re-processing successful messages while retrying only failed ones.",
      },
      {
        type: "code",
        code: `// Node.js: Partial batch response for SQS
export const handler = async (event) => {
  const batchItemFailures = [];
  
  for (const record of event.Records) {
    try {
      await processMessage(record.body);
    } catch (error) {
      // Report this message as failed — Lambda will not delete it
      batchItemFailures.push({ itemIdentifier: record.messageId });
    }
  }
  
  // Return list of failed message IDs
  // Successfully processed messages are deleted from the queue
  return { batchItemFailures };
};`,
      },
      {
        type: "quiz",
        question: "What happens to SQS messages in a batch if your Lambda function throws an unhandled error?",
        options: ["All messages in the batch become visible again in the queue for retry", "Only the failed message is retried", "All messages are moved to the DLQ immediately", "Messages are deleted and lost"],
        correctAnswer: "All messages in the batch become visible again in the queue for retry",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_40",
    title: "Lambda with Kinesis Data Streams",
    service: "lambda",
    roles: ["software_development_engineer", "solutions_architect", "cloud_data_engineer"],
    durationSeconds: 300,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_38"],
    content: [
      {
        type: "text",
        text: "With Kinesis Data Streams, Lambda processes records in order within each shard:\n\n• Lambda processes one batch per shard at a time (default behavior)\n• Scaling: Lambda creates one concurrent invocation per shard\n• ParallelizationFactor (1-10): increase to process up to 10 batches per shard simultaneously (for high-throughput shards)\n• Starting position: TRIM_HORIZON (oldest), LATEST (newest), or AT_TIMESTAMP\n• Error handling: On failure, Lambda retries the batch until success or the record expires from the stream (24-168 hours)\n• BisectBatchOnFunctionError: Lambda splits a failing batch in half and retries to isolate the bad record\n• DestinationConfig: Send failed batches to SQS or SNS after max retries",
      },
      {
        type: "quiz",
        question: "In Lambda's Kinesis event source mapping, what does ParallelizationFactor control?",
        options: ["How many concurrent batches Lambda processes per shard (1–10)", "How many shards Lambda reads from simultaneously", "The number of records per batch", "The maximum concurrency for the entire function"],
        correctAnswer: "How many concurrent batches Lambda processes per shard (1–10)",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_41",
    title: "Lambda with DynamoDB Streams",
    service: "lambda",
    roles: ["software_development_engineer", "solutions_architect"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_38"],
    content: [
      {
        type: "text",
        text: "DynamoDB Streams capture a time-ordered sequence of item-level changes in a DynamoDB table. Lambda can process these changes to build event-driven applications:\n\nCommon patterns:\n• Search indexing: update Elasticsearch/OpenSearch when DynamoDB items change\n• Cross-region replication: replicate changes to another table\n• Audit trail: record all changes to a separate audit table\n• Cache invalidation: clear cached items when the source changes\n\nKey settings:\n• StreamViewType: KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, or NEW_AND_OLD_IMAGES\n• FilterCriteria: filter which DynamoDB events trigger your Lambda (by event type, attribute values, etc.)\n• BisectBatchOnFunctionError: isolate and identify problematic records in a batch",
      },
      {
        type: "quiz",
        question: "Which DynamoDB Streams StreamViewType should you use to get both the previous AND new values of a changed item?",
        options: ["NEW_AND_OLD_IMAGES", "NEW_IMAGE", "OLD_IMAGE", "KEYS_ONLY"],
        correctAnswer: "NEW_AND_OLD_IMAGES",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_42",
    title: "Lambda with API Gateway",
    service: "lambda",
    roles: ["software_development_engineer", "solutions_architect", "application_architect"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_23"],
    content: [
      {
        type: "text",
        text: "API Gateway is the most common Lambda trigger for HTTP-based APIs. API Gateway → Lambda uses a proxy integration where the entire HTTP request is forwarded to Lambda as a JSON event.\n\nAPI types:\n• HTTP API – Simpler, lower cost, lower latency, supports JWT authorizers\n• REST API – More features (request/response transformation, caching, usage plans, API keys)\n• WebSocket API – Bidirectional communication, useful for real-time apps\n\nLambda event format (HTTP API / REST API with proxy integration):\n• event.httpMethod, event.path, event.queryStringParameters\n• event.headers, event.body (base64 encoded if binary)\n• event.requestContext.authorizer (claims from JWT authorizer)",
      },
      {
        type: "code",
        code: `// Lambda response format for API Gateway proxy integration
export const handler = async (event) => {
  const method = event.httpMethod;       // GET, POST, etc.
  const path = event.path;              // /users/123
  const body = event.body ? JSON.parse(event.body) : {};
  const userId = event.pathParameters?.id;
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'  // CORS header
    },
    body: JSON.stringify({ userId, data: 'result' })
  };
};`,
      },
      {
        type: "quiz",
        question: "What is the Lambda response format required for API Gateway proxy integration?",
        options: ["An object with statusCode, headers, and body (body must be a string)", "A plain JavaScript object", "An HTTP response object", "A JSON array"],
        correctAnswer: "An object with statusCode, headers, and body (body must be a string)",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_43",
    title: "Lambda with S3",
    service: "lambda",
    roles: ["software_development_engineer", "solutions_architect", "cloud_data_engineer"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_6"],
    content: [
      {
        type: "text",
        text: "S3 can trigger Lambda functions on object events. Common use cases: image resizing on upload, document processing, log aggregation, ETL pipelines.\n\nEvent types you can configure:\n• s3:ObjectCreated:* (Put, Post, Copy, CompleteMultipartUpload)\n• s3:ObjectRemoved:* (Delete, DeleteMarkerCreated)\n• s3:ObjectRestore:* (PostInitiated, Completed)\n• s3:LifecycleExpiration:*, s3:Replication:*\n\nImportant: Avoid recursive triggers! If your Lambda function writes to the same bucket that triggers it, you'll create an infinite loop. Use different buckets for source and destination, or use different key prefixes with careful filtering.",
      },
      {
        type: "quiz",
        question: "What is the most critical risk to avoid when using S3 as a Lambda trigger?",
        options: ["Writing to the same S3 bucket that triggers the function, creating a recursive loop", "Using too large a batch size", "Not configuring a DLQ", "Using FIFO ordering"],
        correctAnswer: "Writing to the same S3 bucket that triggers the function, creating a recursive loop",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_44",
    title: "Event Filtering for Event Source Mappings",
    service: "lambda",
    roles: ["software_development_engineer", "solutions_architect"],
    durationSeconds: 300,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_38"],
    content: [
      {
        type: "text",
        text: "Event filtering lets you define criteria to control which events actually invoke your Lambda function. Records that don't match the filter are discarded before Lambda is invoked — saving cost and reducing processing load.\n\nFilter criteria supports:\n• Exact match: { \"eventName\": [\"INSERT\"] }\n• Prefix matching: { \"body.type\": [{ \"prefix\": \"order\" }] }\n• Numeric operators: { \"body.amount\": [{ \"numeric\": [\">\", 100] }] }\n• Exists check: { \"body.field\": [{ \"exists\": true }] }\n• Logical OR within an array, AND across multiple filter criteria\n\nSupported on: SQS, Kinesis, DynamoDB Streams, MSK, self-managed Kafka, MQ",
      },
      {
        type: "code",
        code: `// AWS CLI: Add event filter to an SQS ESM
aws lambda create-event-source-mapping \\
  --function-name my-function \\
  --event-source-arn arn:aws:sqs:us-east-1:123456789012:my-queue \\
  --filter-criteria '{
    "Filters": [
      {
        "Pattern": "{\"body\":{\"eventType\":[\"ORDER_PLACED\"],\"amount\":[{\"numeric\":[\">=\",100]}]}}"
      }
    ]
  }'
# Only invokes Lambda when body.eventType is ORDER_PLACED AND body.amount >= 100`,
      },
      {
        type: "quiz",
        question: "What happens to SQS messages that do NOT match your Lambda event filter criteria?",
        options: ["They are discarded (deleted from the queue) without invoking Lambda", "They are sent to the DLQ automatically", "They are held in the queue until they match", "Lambda is invoked but the function receives an empty event"],
        correctAnswer: "They are discarded (deleted from the queue) without invoking Lambda",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_45",
    title: "Lambda with EventBridge",
    service: "lambda",
    roles: ["software_development_engineer", "solutions_architect", "cloud_devops_engineer"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_6"],
    content: [
      {
        type: "text",
        text: "Amazon EventBridge (formerly CloudWatch Events) is a serverless event bus that routes events from AWS services, SaaS applications, and custom sources to Lambda and other targets.\n\nCommon Lambda + EventBridge patterns:\n• Scheduled rules (cron) – Run Lambda on a schedule (e.g., daily reports, hourly cleanup jobs)\n• AWS service events – React to EC2 state changes, CodePipeline events, Security Hub findings\n• Custom application events – Publish custom events and route them to different Lambda functions\n• Event filtering – Use EventBridge patterns to invoke specific Lambda functions for specific events\n\nEventBridge invokes Lambda asynchronously.",
      },
      {
        type: "quiz",
        question: "Which EventBridge feature allows you to run a Lambda function on a recurring schedule (like a cron job)?",
        options: ["Scheduled rules with cron or rate expressions", "Event Bus routing rules", "Schema Registry integration", "Event Archive and Replay"],
        correctAnswer: "Scheduled rules with cron or rate expressions",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_46",
    title: "Lambda with SNS",
    service: "lambda",
    roles: ["software_development_engineer", "solutions_architect"],
    durationSeconds: 240,
    difficulty: "easy",
    xpReward: 70,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_6"],
    content: [
      {
        type: "text",
        text: "Amazon SNS invokes Lambda directly (push model) when a message is published to a topic. SNS → Lambda integration:\n\n• Invocation is asynchronous\n• Lambda handles retries automatically (up to 2 retries for async)\n• Multiple Lambda functions can subscribe to the same SNS topic (fan-out pattern)\n• Lambda's resource-based policy must grant SNS permission to invoke the function\n• Use filter policies on the SNS subscription to limit which messages trigger your Lambda\n\nTypical use cases: notifications processing, fan-out to multiple systems, alert handling, multi-destination message routing.",
      },
      {
        type: "quiz",
        question: "How many Lambda functions can subscribe to a single SNS topic?",
        options: ["Multiple — SNS fan-out allows many subscribers including multiple Lambda functions", "Only one Lambda function per SNS topic", "Up to 5 Lambda functions", "Unlimited, but only one is invoked per message"],
        correctAnswer: "Multiple — SNS fan-out allows many subscribers including multiple Lambda functions",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_47",
    title: "Lambda with Step Functions",
    service: "lambda",
    roles: ["solutions_architect", "software_development_engineer", "application_architect"],
    durationSeconds: 300,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_22"],
    content: [
      {
        type: "text",
        text: "AWS Step Functions orchestrates Lambda functions into complex workflows using state machines. Use Step Functions when:\n• Workflow has many steps with complex branching logic\n• Need visual workflow monitoring in the console\n• Steps need human approval gates\n• Workflow duration exceeds Lambda's 15-minute limit\n• You need parallel execution, error handling, and retry logic with a configuration-first approach\n\nStep Functions vs Lambda Durable Functions:\n• Step Functions: configuration-based (JSON/YAML state machine), visual debugger, better for cross-service orchestration\n• Durable Functions: code-first (TypeScript/Python/Java), simpler for purely Lambda-based workflows, no extra service",
      },
      {
        type: "quiz",
        question: "When would you choose Step Functions over Lambda Durable Functions?",
        options: ["When you need a visual workflow with complex cross-service orchestration and configuration-first state machine definition", "When you need sub-second latency", "When you want to write workflow logic purely in code", "When your workflow fits within Lambda's 15-minute timeout"],
        correctAnswer: "When you need a visual workflow with complex cross-service orchestration and configuration-first state machine definition",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_48",
    title: "Lambda with Secrets Manager",
    service: "lambda",
    roles: ["software_development_engineer", "cloud_security_engineer"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_14"],
    content: [
      {
        type: "text",
        text: "For accessing database credentials, API keys, and other secrets in Lambda, AWS recommends Secrets Manager over environment variables. Two approaches:\n\n1. AWS Parameters and Secrets Lambda Extension – A Lambda Layer that caches secrets locally. Your function retrieves secrets from localhost (fast, no SDK call needed per invocation). Best for frequently-invoked functions.\n\n2. Boto3/SDK call at initialization – Fetch the secret during the Init phase (outside handler) and cache it in global scope. The secret is reused across warm invocations. Rotate by updating the function's environment or using Secret Manager's automatic rotation.",
      },
      {
        type: "code",
        code: `# Python: Fetch and cache secret at init time
import boto3
import json

# Fetch once at cold start, reused across warm invocations
secret_client = boto3.client('secretsmanager')
secret_value = secret_client.get_secret_value(SecretId='my-db-secret')
secret = json.loads(secret_value['SecretString'])
DB_PASSWORD = secret['password']  # Cached in global scope

def handler(event, context):
    # DB_PASSWORD is already available — no SDK call needed
    return process_with_db(DB_PASSWORD)`,
      },
      {
        type: "quiz",
        question: "What is the advantage of the AWS Parameters and Secrets Lambda Extension over fetching secrets in your function code?",
        options: ["It caches secrets locally and serves them from localhost, avoiding SDK API calls on every invocation", "It provides stronger encryption", "It automatically rotates credentials in your code", "It works without any IAM permissions"],
        correctAnswer: "It caches secrets locally and serves them from localhost, avoiding SDK API calls on every invocation",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_49",
    title: "Lambda with RDS and Database Connections",
    service: "lambda",
    roles: ["software_development_engineer", "solutions_architect"],
    durationSeconds: 300,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_29"],
    content: [
      {
        type: "text",
        text: "Connecting Lambda to relational databases (RDS, Aurora) requires care because Lambda's ephemeral nature and high concurrency can exhaust database connections:\n\nThe problem: Each Lambda execution environment opens its own DB connection. At 1,000 concurrent executions, you'd have 1,000 connections — far exceeding most RDS instance connection limits.\n\nSolutions:\n1. RDS Proxy – A fully managed connection pool that sits between Lambda and RDS. Lambda functions connect to the proxy (which maintains a pool), not directly to RDS. Dramatically reduces connection count.\n\n2. Connection pooling in code – Reuse connections across warm invocations using global scope (works within a single execution environment, not across concurrent ones).\n\n3. Aurora Serverless v2 – Automatically scales compute capacity with your workload.",
      },
      {
        type: "quiz",
        question: "What is the recommended solution to prevent Lambda from exhausting RDS database connection limits at high concurrency?",
        options: ["RDS Proxy — a managed connection pooler between Lambda and RDS", "Reduce Lambda concurrency to 1", "Use DynamoDB instead", "Enable connection multiplexing in Lambda settings"],
        correctAnswer: "RDS Proxy — a managed connection pooler between Lambda and RDS",
      },
    ],
  },

  // ============================================
  // LAMBDA MODULE 5: SCALING & CONCURRENCY (8 lessons)
  // ============================================
  {
    lessonId: "lambda_lesson_50",
    title: "Lambda Concurrency Model",
    service: "lambda",
    roles: ["solutions_architect", "software_development_engineer", "cloud_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_3"],
    content: [
      {
        type: "text",
        text: "Lambda concurrency = the number of function instances processing requests at the same time.\n\nFormula: Concurrency ≈ (requests per second) × (average duration in seconds)\n\nExample: 100 req/sec × 0.5 sec average = ~50 concurrent executions needed\n\nEach Lambda invocation gets its own execution environment (default behavior). When a function is invoked while all existing environments are busy, Lambda creates a new one (scaling).\n\nAccount-level concurrency: All functions in a Region share the total account concurrency pool (default 1,000). If one function uses all concurrency, other functions may be throttled.",
      },
      {
        type: "quiz",
        question: "If a Lambda function receives 200 requests per second and each request takes 0.5 seconds to process, approximately how many concurrent executions are needed?",
        options: ["~100 concurrent executions (200 × 0.5)", "200 concurrent executions", "400 concurrent executions", "1 concurrent execution"],
        correctAnswer: "~100 concurrent executions (200 × 0.5)",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_51",
    title: "Reserved Concurrency",
    service: "lambda",
    roles: ["solutions_architect", "cloud_administrator", "cloud_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_50"],
    content: [
      {
        type: "text",
        text: "Reserved concurrency reserves a portion of your account's total concurrency for a specific function. Effects:\n\n• Guarantees capacity: The function always has up to N concurrent executions available (other functions can't use them)\n• Hard ceiling: The function can NEVER exceed N concurrent executions (even if account has capacity)\n• Setting reserved concurrency to 0 effectively throttles all invocations of the function\n\nUse cases:\n• Prevent one high-traffic function from starving others (set a ceiling)\n• Guarantee a critical function always has capacity (set a floor)\n• Rate-limit downstream systems by capping Lambda concurrency (e.g., cap at 10 to prevent overwhelming a database)",
      },
      {
        type: "quiz",
        question: "What happens if you set a Lambda function's reserved concurrency to 0?",
        options: ["All invocations of the function are throttled (rejected)", "The function runs with unlimited concurrency", "The function runs with the account default concurrency", "The function is deleted"],
        correctAnswer: "All invocations of the function are throttled (rejected)",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_52",
    title: "Provisioned Concurrency",
    service: "lambda",
    roles: ["solutions_architect", "software_development_engineer"],
    durationSeconds: 300,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_51"],
    content: [
      {
        type: "text",
        text: "Provisioned concurrency pre-initializes a specified number of execution environments so they're ready to respond immediately — eliminating cold starts.\n\n• When invocations arrive, they're served by pre-warmed environments (no init phase latency)\n• Additional invocations beyond the provisioned count use regular (cold) concurrency\n• Provisioned concurrency is billed differently: you pay for the pre-warmed environments whether they're used or not, plus regular duration charges\n• Applies to specific function versions or aliases (not $LATEST)\n\nAuto-scaling provisioned concurrency:\nUse Application Auto Scaling to automatically adjust provisioned concurrency based on a schedule (e.g., scale up at 8 AM, down at 10 PM) or utilization target.",
      },
      {
        type: "quiz",
        question: "What is the key difference between Reserved Concurrency and Provisioned Concurrency?",
        options: ["Reserved limits max concurrent executions; Provisioned pre-warms environments to eliminate cold starts", "They are the same feature with different names", "Reserved pre-warms environments; Provisioned limits concurrency", "Reserved is free; Provisioned has additional cost"],
        correctAnswer: "Reserved limits max concurrent executions; Provisioned pre-warms environments to eliminate cold starts",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_53",
    title: "Lambda Scaling Behavior",
    service: "lambda",
    roles: ["solutions_architect", "software_development_engineer"],
    durationSeconds: 300,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_50"],
    content: [
      {
        type: "text",
        text: "Lambda scales automatically, but there's a burst limit that controls how quickly scaling happens:\n\nInitial burst scaling:\n• US East (N. Virginia), US West (Oregon), Europe (Ireland): 3,000 concurrent executions burst\n• Most other Regions: 500-1,000 concurrent executions burst\n• After the initial burst, Lambda can add 500 concurrent executions per minute\n\nSteady-state scaling:\n• Lambda scales up to the account concurrency limit (default 1,000)\n• No upper limit on throughput (requests per second) — only on concurrent executions\n\nThrottling: When Lambda receives more invocations than available concurrency, it returns a 429 TooManyRequestsException. For synchronous invocations, the caller must handle throttling and retry with exponential backoff.",
      },
      {
        type: "quiz",
        question: "After the initial burst limit is reached, how quickly can Lambda add additional concurrent executions?",
        options: ["500 concurrent executions per minute", "1,000 per minute", "Unlimited immediately", "100 per second"],
        correctAnswer: "500 concurrent executions per minute",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_54",
    title: "Lambda Managed Instances",
    service: "lambda",
    roles: ["solutions_architect", "software_development_engineer"],
    durationSeconds: 300,
    difficulty: "hard",
    xpReward: 110,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_50"],
    content: [
      {
        type: "text",
        text: "Lambda Managed Instances is a new Lambda compute type where multiple concurrent requests can be processed within a single execution environment (unlike standard Lambda where each environment handles one request at a time).\n\nKey difference: Standard Lambda = 1 request per environment. Managed Instances = many requests per environment (configurable via PerExecutionEnvironmentMaxConcurrency).\n\nConcurrency models by runtime:\n• Java: Thread-based concurrency (default 32 per vCPU)\n• Node.js: Worker threads + async/await (default 64 per vCPU)\n• Python: Process-based isolation (default 16 per vCPU)\n• .NET: Task-based (.NET Tasks, default 32 per vCPU)",
      },
      {
        type: "quiz",
        question: "How does Lambda Managed Instances differ from standard Lambda in handling concurrent requests?",
        options: ["Managed Instances allows multiple concurrent requests within a single execution environment; standard Lambda handles one request per environment", "Managed Instances is slower but cheaper", "Managed Instances uses different programming languages", "There is no functional difference"],
        correctAnswer: "Managed Instances allows multiple concurrent requests within a single execution environment; standard Lambda handles one request per environment",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_55",
    title: "Monitoring Concurrency",
    service: "lambda",
    roles: ["solutions_architect", "cloud_administrator"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_50"],
    content: [
      {
        type: "text",
        text: "Key CloudWatch metrics for monitoring Lambda concurrency:\n\n• ConcurrentExecutions – The number of function instances processing events at a given time (account-level and function-level)\n• UnreservedConcurrentExecutions – Concurrency used by functions without reserved concurrency\n• ProvisionedConcurrencyUtilization – % of provisioned concurrency in use\n• ProvisionedConcurrencySpilloverInvocations – Invocations served by non-provisioned (cold) environments\n• ClaimedAccountConcurrency – Total account concurrency claimed by reserved and provisioned settings\n• Throttles – Count of throttled invocations (429 errors)\n\nRecommended alert: Set a CloudWatch alarm when ConcurrentExecutions approaches your account limit.",
      },
      {
        type: "quiz",
        question: "Which CloudWatch metric tells you how many Lambda invocations were rejected due to reaching concurrency limits?",
        options: ["Throttles", "Errors", "ConcurrentExecutions", "Duration"],
        correctAnswer: "Throttles",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_56",
    title: "Lambda Provisioned Mode for Event Source Mappings",
    service: "lambda",
    roles: ["solutions_architect", "software_development_engineer"],
    durationSeconds: 240,
    difficulty: "hard",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_38"],
    content: [
      {
        type: "text",
        text: "For SQS and Kafka Event Source Mappings, Lambda supports a Provisioned Mode that pre-allocates dedicated Lambda pollers (event readers) for predictable, low-latency processing:\n\n• Default (on-demand) mode: Lambda dynamically scales pollers based on queue depth\n• Provisioned mode: A fixed number of pollers always run, providing consistent latency and throughput\n\nUse provisioned mode when:\n• You need predictable, low-latency message processing\n• Your queue consistently has messages (high throughput workloads)\n• You want to avoid the warmup delay when a queue goes from idle to active\n\nNote: Provisioned mode pollers incur costs even when there are no messages.",
      },
      {
        type: "quiz",
        question: "What is the main benefit of using Provisioned Mode for SQS Event Source Mappings?",
        options: ["Consistent low-latency processing with pre-allocated pollers regardless of queue depth", "Reduced Lambda function costs", "Automatic message deduplication", "Support for larger batch sizes"],
        correctAnswer: "Consistent low-latency processing with pre-allocated pollers regardless of queue depth",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_57",
    title: "Tenant Isolation Mode",
    service: "lambda",
    roles: ["solutions_architect", "software_development_engineer", "cloud_security_engineer"],
    durationSeconds: 240,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_50"],
    content: [
      {
        type: "text",
        text: "Lambda Tenant Isolation Mode gives each invocation its own isolated execution environment — preventing any shared state between tenants in a multi-tenant application.\n\nPurpose: In a single Lambda function serving multiple tenants (customers), standard Lambda may reuse execution environments across different tenants' requests. Tenant isolation mode guarantees that each tenant's invocation runs in a dedicated, isolated environment.\n\nHow to use: Set the X-Amzn-Lambda-Tenant-Id header (or equivalent SDK parameter) when invoking. Lambda creates a separate execution environment per unique tenant ID.\n\nUse cases: SaaS applications with strict data isolation requirements, healthcare (HIPAA), financial services.",
      },
      {
        type: "quiz",
        question: "What problem does Lambda Tenant Isolation Mode solve for SaaS applications?",
        options: ["It prevents shared state between different tenants by giving each tenant their own isolated execution environment", "It improves Lambda performance for multi-tenant workloads", "It reduces cost by sharing resources more efficiently", "It enables cross-tenant data sharing"],
        correctAnswer: "It prevents shared state between different tenants by giving each tenant their own isolated execution environment",
      },
    ],
  },

  // ============================================
  // LAMBDA MODULE 6: SECURITY & PERMISSIONS (10 lessons)
  // ============================================
  {
    lessonId: "lambda_lesson_58",
    title: "Lambda Execution Role",
    service: "lambda",
    roles: ["solutions_architect", "cloud_security_engineer", "cloud_administrator", "software_development_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_3"],
    content: [
      {
        type: "text",
        text: "The execution role is an IAM role that Lambda assumes when running your function. It grants your function permissions to call other AWS services (DynamoDB, S3, SQS, etc.).\n\nMinimum required permissions (included in AWSLambdaBasicExecutionRole):\n• logs:CreateLogGroup\n• logs:CreateLogStream\n• logs:PutLogEvents\n\nBest practices:\n• Follow least privilege — grant only the specific actions and resources the function needs\n• Avoid wildcard resources (e.g., arn:aws:s3:::*) — scope to specific buckets and tables\n• Use separate execution roles for each function, not one role for all functions\n• Review execution roles with IAM Access Analyzer\n• Use AWS managed policies as starting points, then restrict further",
      },
      {
        type: "quiz",
        question: "What does the Lambda execution role grant permissions to?",
        options: ["Permissions for the Lambda function to call other AWS services during execution", "Permissions for other services to invoke your Lambda function", "Permissions for IAM users to modify the function", "Permissions for Lambda to create new functions"],
        correctAnswer: "Permissions for the Lambda function to call other AWS services during execution",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_59",
    title: "Lambda Resource-Based Policies",
    service: "lambda",
    roles: ["solutions_architect", "cloud_security_engineer", "cloud_administrator"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_58"],
    content: [
      {
        type: "text",
        text: "Resource-based policies (also called function policies) control who can INVOKE your Lambda function. They're separate from the execution role, which controls what your function can DO.\n\nResource-based policies are required when:\n• An AWS service (S3, SNS, EventBridge) needs to invoke your function (push model)\n• A different AWS account needs to invoke your function (cross-account)\n• A function URL needs to allow or restrict access\n\nFor event source mappings (SQS, Kinesis, DynamoDB): Lambda uses the execution role to poll the source — no resource-based policy needed.\n\nAWS automatically adds a resource-based policy when you add a trigger in the Lambda console.",
      },
      {
        type: "quiz",
        question: "When Amazon S3 triggers a Lambda function (push model), what determines if S3 has permission to invoke the function?",
        options: ["A resource-based policy (function policy) on the Lambda function granting S3 permission to invoke it", "The Lambda execution role", "An S3 bucket policy", "An IAM identity-based policy"],
        correctAnswer: "A resource-based policy (function policy) on the Lambda function granting S3 permission to invoke it",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_60",
    title: "IAM Identity-Based Policies for Lambda",
    service: "lambda",
    roles: ["solutions_architect", "cloud_security_engineer", "cloud_administrator"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_58"],
    content: [
      {
        type: "text",
        text: "Identity-based policies control what IAM users, groups, and roles can do with Lambda functions. Common Lambda IAM actions:\n\n• lambda:InvokeFunction – Invoke a specific function\n• lambda:CreateFunction, lambda:UpdateFunctionCode – Create/update functions\n• lambda:GetFunction, lambda:ListFunctions – Read function info\n• lambda:DeleteFunction – Delete functions\n• lambda:PublishVersion – Publish new versions\n• lambda:CreateAlias, lambda:UpdateAlias – Manage aliases\n\nAWS managed policies for Lambda:\n• AWSLambdaBasicExecutionRole – Minimum for execution (CloudWatch Logs)\n• AWSLambdaVPCAccessExecutionRole – Adds VPC networking permissions\n• AWSLambdaReadOnlyAccess – Read-only access to Lambda resources",
      },
      {
        type: "quiz",
        question: "Which IAM permission does a developer need to update the code of a Lambda function?",
        options: ["lambda:UpdateFunctionCode", "lambda:UpdateFunction", "lambda:PutFunctionCode", "lambda:DeployFunction"],
        correctAnswer: "lambda:UpdateFunctionCode",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_61",
    title: "Lambda Encryption",
    service: "lambda",
    roles: ["solutions_architect", "cloud_security_engineer"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_14"],
    content: [
      {
        type: "text",
        text: "Lambda provides encryption at multiple layers:\n\n1. Function code – Deployment packages are encrypted at rest using AWS KMS. You can use a customer-managed KMS key for additional control.\n\n2. Environment variables – Encrypted at rest using AWS KMS. Default: AWS managed key (free). Option: Customer-managed key (additional control + cost). You can also use Encryption Helpers in the console to encrypt individual variable values before storing.\n\n3. In transit – All data between Lambda and other AWS services uses HTTPS/TLS by default.\n\n4. Durable function state – Checkpoint data is encrypted at rest using AWS owned keys (no customer managed key support).",
      },
      {
        type: "quiz",
        question: "By default, Lambda environment variables are encrypted using which type of KMS key?",
        options: ["An AWS managed key (at no extra charge)", "A customer-managed key (you control and pay for)", "No encryption (plaintext storage)", "A per-function automatically generated key"],
        correctAnswer: "An AWS managed key (at no extra charge)",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_62",
    title: "Lambda Code Signing",
    service: "lambda",
    roles: ["solutions_architect", "cloud_security_engineer", "cloud_devops_engineer"],
    durationSeconds: 240,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_8"],
    content: [
      {
        type: "text",
        text: "Lambda code signing ensures that only approved code is deployed to your Lambda functions. It uses AWS Signer to cryptographically sign your deployment packages.\n\nHow it works:\n1. You create a code signing configuration that trusts one or more signing profiles\n2. Your CI/CD pipeline signs the .zip package using AWS Signer\n3. Lambda validates the signature when code is deployed\n4. If the signature is invalid or untrusted, deployment is rejected\n\nEnforcement policies:\n• Warn – Invalid signatures log a warning but deployment proceeds\n• Enforce – Invalid signatures cause deployment to fail\n\nNote: Code signing applies only to .zip deployments, not container images.",
      },
      {
        type: "quiz",
        question: "What does Lambda code signing protect against?",
        options: ["Unauthorized or tampered code being deployed to your Lambda functions", "Code running with excessive permissions", "Recursive invocation loops", "Cold start performance issues"],
        correctAnswer: "Unauthorized or tampered code being deployed to your Lambda functions",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_63",
    title: "Lambda and AWS Organizations Governance",
    service: "lambda",
    roles: ["solutions_architect", "cloud_administrator", "cloud_security_engineer"],
    durationSeconds: 240,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_59"],
    content: [
      {
        type: "text",
        text: "For enterprise governance of Lambda at scale, use these tools:\n\n1. AWS Config Rules – Detect Lambda functions that are non-compliant (e.g., missing encryption, using deprecated runtimes, VPC not configured)\n\n2. AWS CloudFormation Guard (cfn-guard) – Proactive controls that validate IaC templates before deployment\n\n3. Service Control Policies (SCPs) – Org-level guardrails to prevent certain actions across all accounts (e.g., prohibit creating Lambda functions in specific Regions)\n\n4. AWS Security Hub – Aggregate security findings about Lambda functions across all accounts\n\n5. Lambda Code Signing – Require signed deployment packages across the organization",
      },
      {
        type: "quiz",
        question: "Which AWS tool provides proactive governance by validating CloudFormation and SAM templates BEFORE deployment?",
        options: ["AWS CloudFormation Guard (cfn-guard)", "AWS Config", "AWS Security Hub", "AWS CloudTrail"],
        correctAnswer: "AWS CloudFormation Guard (cfn-guard)",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_64",
    title: "Attribute-Based Access Control (ABAC) for Lambda",
    service: "lambda",
    roles: ["solutions_architect", "cloud_security_engineer"],
    durationSeconds: 240,
    difficulty: "hard",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_60"],
    content: [
      {
        type: "text",
        text: "ABAC for Lambda uses function tags as conditions in IAM policies to grant or restrict access. Instead of creating IAM policies per function, you create tag-based policies that scale automatically.\n\nExample: Grant a developer access to invoke any Lambda function tagged with Environment=dev and Team=backend:\n\n```json\n{\n  \"Effect\": \"Allow\",\n  \"Action\": \"lambda:InvokeFunction\",\n  \"Resource\": \"*\",\n  \"Condition\": {\n    \"StringEquals\": {\n      \"aws:ResourceTag/Environment\": \"dev\",\n      \"aws:ResourceTag/Team\": \"backend\"\n    }\n  }\n}\n```\n\nABAC benefits: Fewer IAM policies to manage, permissions scale automatically as new functions are tagged correctly.",
      },
      {
        type: "quiz",
        question: "What is the key advantage of using ABAC (tag-based policies) over traditional ARN-based IAM policies for Lambda?",
        options: ["Permissions scale automatically — new functions tagged correctly are immediately covered without policy updates", "ABAC is faster than ARN-based policies", "ABAC requires fewer tags", "ABAC bypasses IAM evaluation"],
        correctAnswer: "Permissions scale automatically — new functions tagged correctly are immediately covered without policy updates",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_65",
    title: "Securing Workloads with Public Lambda Endpoints",
    service: "lambda",
    roles: ["solutions_architect", "cloud_security_engineer", "software_development_engineer"],
    durationSeconds: 300,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_23"],
    content: [
      {
        type: "text",
        text: "When Lambda functions are exposed via public endpoints (Function URLs, API Gateway), you need multiple layers of security:\n\n1. Authentication – Use AWS_IAM auth type on function URLs (requires SigV4 signing) or JWT/Cognito authorizers with API Gateway\n\n2. Authorization – Implement business logic in your function or use API Gateway resource policies\n\n3. API protection – Rate limiting/throttling, request validation, WAF integration\n\n4. AWS WAF – Attach a Web Application Firewall to API Gateway to filter malicious requests (SQL injection, XSS, bot traffic, IP allowlists/blocklists)\n\n5. Input validation – Never trust client input; validate event data in your function",
      },
      {
        type: "quiz",
        question: "Which AWS service can you attach to API Gateway to protect Lambda functions from common web attacks like SQL injection and XSS?",
        options: ["AWS WAF (Web Application Firewall)", "AWS Shield", "AWS GuardDuty", "AWS Inspector"],
        correctAnswer: "AWS WAF (Web Application Firewall)",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_66",
    title: "Lambda Source Function ARN",
    service: "lambda",
    roles: ["solutions_architect", "software_development_engineer"],
    durationSeconds: 240,
    difficulty: "hard",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_59"],
    content: [
      {
        type: "text",
        text: "The Source Function ARN is a security feature that helps prevent the confused deputy problem when Lambda functions invoke other Lambda functions.\n\nThe confused deputy problem: Service A assumes a role with broad permissions. A malicious actor tricks Service A into performing an action on a resource they don't own by sending a crafted request.\n\nSolution: When Lambda invokes another function, it includes the SourceFunctionArn in the AWS Security Token Service (STS) session. You can add a condition to your function's resource-based policy requiring that the calling entity's source function ARN matches an expected value:\n\n```json\n\"Condition\": {\n  \"ArnLike\": {\n    \"lambda:SourceFunctionArn\": \"arn:aws:lambda:us-east-1:123456789012:function:my-trusted-function\"\n  }\n}\n```",
      },
      {
        type: "quiz",
        question: "What security problem does Lambda's Source Function ARN help prevent?",
        options: ["The confused deputy problem — where a trusted service is tricked into performing unauthorized actions on behalf of an attacker", "Cold start performance issues", "Recursive invocation loops", "Excessive IAM permissions"],
        correctAnswer: "The confused deputy problem — where a trusted service is tricked into performing unauthorized actions on behalf of an attacker",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_67",
    title: "Lambda CloudTrail Logging",
    service: "lambda",
    roles: ["solutions_architect", "cloud_security_engineer", "cloud_administrator"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_58"],
    content: [
      {
        type: "text",
        text: "AWS CloudTrail records all Lambda API calls for auditing:\n\nManagement events (enabled by default):\n• CreateFunction, UpdateFunctionCode, DeleteFunction\n• AddPermission, RemovePermission\n• PublishVersion, CreateAlias, UpdateAlias\n• GetFunction, ListFunctions\n\nData events (additional cost, must enable explicitly):\n• InvokeFunction – Records every function invocation\n• GetLayerVersion – Records layer access\n\nUse cases:\n• Audit who deployed new function versions\n• Detect unauthorized function invocations\n• Track permission changes to execution roles\n• Investigate function behavior changes",
      },
      {
        type: "quiz",
        question: "Are Lambda invocation events (InvokeFunction) logged in CloudTrail by default?",
        options: ["No — invocation data events must be explicitly enabled and incur additional cost", "Yes — all Lambda events are logged by default", "Yes — but only for functions with execution roles", "No — Lambda does not support CloudTrail"],
        correctAnswer: "No — invocation data events must be explicitly enabled and incur additional cost",
      },
    ],
  },

  // ============================================
  // LAMBDA MODULE 7: MONITORING, LOGGING & TRACING (10 lessons)
  // ============================================
  {
    lessonId: "lambda_lesson_68",
    title: "Lambda CloudWatch Metrics",
    service: "lambda",
    roles: ["solutions_architect", "cloud_administrator", "software_development_engineer", "cloud_devops_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_3"],
    content: [
      {
        type: "text",
        text: "Lambda automatically publishes metrics to Amazon CloudWatch. Key metrics:\n\nInvocation metrics:\n• Invocations – Total invocation count (success and errors)\n• Errors – Count of failed invocations (function errors + timeouts)\n• Throttles – Count of throttled invocations (429 errors)\n• Duration – Execution time in milliseconds (Average, P99, Maximum)\n• ConcurrentExecutions – Current number of executing instances\n\nAsync metrics:\n• AsyncEventsReceived, AsyncEventAge, AsyncEventsDropped\n\nEvent Source Mapping metrics:\n• IteratorAge (Kinesis/DynamoDB) – Age of oldest record in batch\n\nRecommended alarms: Errors > 0, Throttles > 0, Duration approaching timeout (P99 > 80% of timeout).",
      },
      {
        type: "quiz",
        question: "Which Lambda metric helps you detect if messages are accumulating in a Kinesis stream faster than Lambda can process them?",
        options: ["IteratorAge — measures the age of the oldest record in the batch", "Duration", "Throttles", "ConcurrentExecutions"],
        correctAnswer: "IteratorAge — measures the age of the oldest record in the batch",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_69",
    title: "Lambda Logging",
    service: "lambda",
    roles: ["software_development_engineer", "cloud_administrator"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_68"],
    content: [
      {
        type: "text",
        text: "Lambda automatically sends all stdout/stderr output to Amazon CloudWatch Logs. Each function gets a log group (/aws/lambda/{function-name}) with log streams per execution environment.\n\nLog format options (Lambda Advanced Logging Controls):\n• Text – Default unstructured format\n• JSON – Structured logging that enables CloudWatch Logs Insights queries\n\nLog level filtering (JSON format only):\n• Filter out DEBUG logs in production to reduce cost\n• Set independently: application log level and system log level\n\nEach invocation generates START, END, and REPORT log entries:\n• REPORT includes: RequestId, Duration, Billed Duration, Memory Size, Max Memory Used, Init Duration (cold starts)\n\nBest practice: Use structured JSON logging so you can query logs with CloudWatch Logs Insights.",
      },
      {
        type: "quiz",
        question: "What information does the Lambda REPORT log line include?",
        options: ["RequestId, Duration, Billed Duration, Memory Size, Max Memory Used, and Init Duration (for cold starts)", "Function name, version, and Region only", "Error messages and stack traces", "Event payload and response data"],
        correctAnswer: "RequestId, Duration, Billed Duration, Memory Size, Max Memory Used, and Init Duration (for cold starts)",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_70",
    title: "Lambda Log Destinations",
    service: "lambda",
    roles: ["software_development_engineer", "cloud_administrator", "cloud_devops_engineer"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_69"],
    content: [
      {
        type: "text",
        text: "Lambda can send logs to multiple destinations beyond CloudWatch Logs:\n\n1. CloudWatch Logs (default) – Stores logs in log groups. Supports Logs Insights queries, metric filters, and subscriptions.\n\n2. Amazon Kinesis Data Firehose – Stream logs to S3, Redshift, or OpenSearch for long-term analysis and cost optimization.\n\n3. Amazon S3 – Archive logs directly for compliance and cost-efficient storage.\n\nCross-account logging:\nYou can configure log destinations in a different AWS account (e.g., centralize logs from all accounts into a security/logging account). Requires permission to write to the destination account's resource.",
      },
      {
        type: "quiz",
        question: "Which log destination would you use to stream Lambda logs to Amazon S3 for low-cost long-term archival?",
        options: ["Amazon Kinesis Data Firehose (streams to S3, Redshift, or OpenSearch)", "CloudWatch Logs (only keeps logs up to 2 years)", "Amazon SQS", "AWS CloudTrail"],
        correctAnswer: "Amazon Kinesis Data Firehose (streams to S3, Redshift, or OpenSearch)",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_71",
    title: "AWS X-Ray Tracing for Lambda",
    service: "lambda",
    roles: ["software_development_engineer", "cloud_administrator"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_68"],
    content: [
      {
        type: "text",
        text: "AWS X-Ray provides end-to-end tracing of Lambda functions and their downstream calls, helping diagnose latency issues and errors across distributed systems.\n\nX-Ray tracing modes for Lambda:\n• PassThrough (default) – Lambda records a trace if an upstream service added tracing headers\n• Active – Lambda always samples requests and sends traces to X-Ray\n\nWith Active tracing enabled, Lambda automatically creates trace segments for each invocation. Use the X-Ray SDK in your function to add subsegments for downstream calls (DynamoDB, S3, RDS, HTTP calls).\n\nKey X-Ray concepts:\n• Trace – Represents one request's journey through your system\n• Segment – One component's contribution (your Lambda function)\n• Subsegment – A downstream call within a segment (DynamoDB query, HTTP call)",
      },
      {
        type: "quiz",
        question: "What must you do to make Lambda always sample and send traces to X-Ray (not just when upstream services include trace headers)?",
        options: ["Enable Active tracing mode on the function", "Install the X-Ray SDK", "Enable CloudTrail data events", "Add an X-Ray permission to the execution role"],
        correctAnswer: "Enable Active tracing mode on the function",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_72",
    title: "Lambda Insights and Application Signals",
    service: "lambda",
    roles: ["solutions_architect", "cloud_administrator"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_68"],
    content: [
      {
        type: "text",
        text: "Lambda Insights is a CloudWatch feature that provides enhanced monitoring beyond basic metrics:\n\n• Collects system-level metrics: CPU utilization, memory, disk I/O, network I/O\n• Provides a dedicated Lambda Insights dashboard\n• Detects function anomalies automatically\n• Identifies cold starts, memory exhaustion, and performance degradation\n• Enabled via a CloudWatch Lambda Insights Extension layer\n\nApplication Signals:\nA newer observability feature that monitors Lambda function performance from an application perspective:\n• Tracks SLOs (Service Level Objectives)\n• Shows request rates, error rates, and p99 latency\n• Correlates metrics across services in a service map\n• Useful for microservices architectures using Lambda",
      },
      {
        type: "quiz",
        question: "What additional metrics does Lambda Insights provide that standard Lambda CloudWatch metrics don't?",
        options: ["System-level metrics like CPU utilization, memory, disk I/O, and network I/O", "Function invocation counts", "IAM policy violations", "Deployment history"],
        correctAnswer: "System-level metrics like CPU utilization, memory, disk I/O, and network I/O",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_73",
    title: "Powertools for AWS Lambda",
    service: "lambda",
    roles: ["software_development_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_5"],
    content: [
      {
        type: "text",
        text: "Powertools for AWS Lambda is an open-source developer library that simplifies implementing Lambda best practices. Available for Python, TypeScript, Java, and .NET.\n\nKey features:\n• Structured Logging – JSON logging with request correlation IDs automatically included\n• Tracing – X-Ray subsegment creation for your function and downstream calls\n• Metrics – Creating CloudWatch Embedded Metrics Format (EMF) metrics inline in logs\n• Event Handler – Type-safe routing for API Gateway, ALB, AppSync, and more\n• Idempotency – Prevent duplicate processing of retried events\n• Parameters – Easy retrieval from SSM, Secrets Manager, AppConfig with caching\n• Batch Processing – Handle partial batch failures for SQS/Kinesis/DynamoDB with proper error handling",
      },
      {
        type: "quiz",
        question: "Which Powertools feature helps prevent duplicate processing when Lambda functions are invoked multiple times for the same event?",
        options: ["Idempotency utility", "Structured Logging", "Event Handler", "Tracer"],
        correctAnswer: "Idempotency utility",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_74",
    title: "Lambda Troubleshooting Common Errors",
    service: "lambda",
    roles: ["software_development_engineer", "cloud_administrator"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_69"],
    content: [
      {
        type: "text",
        text: "Common Lambda error categories and solutions:\n\nTimeout errors (Task timed out after X seconds):\n• Increase timeout\n• Optimize slow code (SDK calls, DB queries)\n• Add context.getRemainingTimeInMillis() checks\n\nMemory/OOM errors:\n• Increase memory allocation\n• Optimize data structures and avoid loading large files into memory\n• Use /tmp for large files\n\nPermission errors (AccessDenied, Unauthorized):\n• Check execution role has required permissions\n• Verify resource-based policy for push triggers\n• Check VPC endpoint policies if using PrivateLink\n\nCold start / init timeout (Sandbox.Timedout):\n• Reduce init code (lazy loading)\n• Use SnapStart or Provisioned Concurrency\n\nVPC errors (ENILimitReachedException):\n• Request ENI quota increase\n• Reduce function concurrency\n• Use Hyperplane ENIs (Lambda manages them)",
      },
      {
        type: "quiz",
        question: "A Lambda function gets 'Task timed out after 3 seconds' errors even though execution normally takes 2 seconds. What is the most likely fix?",
        options: ["Increase the function timeout to give a buffer beyond the typical execution time", "Reduce memory allocation", "Enable VPC access", "Switch to a faster runtime"],
        correctAnswer: "Increase the function timeout to give a buffer beyond the typical execution time",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_75",
    title: "Lambda Debugging with VS Code",
    service: "lambda",
    roles: ["software_development_engineer"],
    durationSeconds: 240,
    difficulty: "hard",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_24"],
    content: [
      {
        type: "text",
        text: "Lambda supports remote debugging of deployed functions using Visual Studio Code:\n\n1. Install the AWS Toolkit for VS Code\n2. The AWS SAM CLI can start a local Lambda container for debugging\n3. Attach the VS Code debugger to the local container\n4. Set breakpoints, step through code, and inspect variables\n\nFor deployed functions, Lambda supports remote debugging:\n• Uses a special debug mode that pauses function execution waiting for a debugger to attach\n• Security consideration: Debug mode uses a different endpoint; restrict access via IAM\n• Supported runtimes: Node.js, Python, Java, .NET\n\nAlternatively, use AWS SAM CLI's `sam local invoke` with `--debug-port` for local debugging without deploying to AWS.",
      },
      {
        type: "quiz",
        question: "What tool enables local Lambda function debugging with breakpoints using VS Code?",
        options: ["AWS SAM CLI with --debug-port flag and the AWS Toolkit for VS Code", "Lambda console debugger", "AWS X-Ray local agent", "CloudWatch Live Tail"],
        correctAnswer: "AWS SAM CLI with --debug-port flag and the AWS Toolkit for VS Code",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_76",
    title: "Lambda Extensions",
    service: "lambda",
    roles: ["software_development_engineer", "cloud_devops_engineer"],
    durationSeconds: 300,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_4"],
    content: [
      {
        type: "text",
        text: "Lambda Extensions allow you to integrate monitoring, security, and governance tools into the Lambda execution environment without modifying function code.\n\nTwo types:\n• Internal extensions – Run as part of the runtime process (e.g., language-specific via wrapper scripts or environment variables)\n• External extensions – Run as separate processes alongside the runtime in the same environment\n\nExtension lifecycle:\n1. Register – Extension registers with Lambda to receive invocation and shutdown events\n2. Init phase – Extension runs startup tasks\n3. Invoke phase – Extension receives notifications when each invocation starts/ends\n4. Shutdown phase – Extension receives SIGTERM for cleanup (flush buffers, finalize exports)\n\nCommon uses: send telemetry to Datadog/Dynatrace, rotate credentials, enforce security policies.",
      },
      {
        type: "quiz",
        question: "What is the key difference between an internal and external Lambda extension?",
        options: ["Internal extensions run within the runtime process; external extensions run as separate processes alongside the runtime", "Internal extensions are faster; external extensions are more powerful", "Internal extensions require code changes; external extensions don't", "Internal extensions are AWS-managed; external are customer-managed"],
        correctAnswer: "Internal extensions run within the runtime process; external extensions run as separate processes alongside the runtime",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_77",
    title: "Lambda Telemetry API",
    service: "lambda",
    roles: ["software_development_engineer"],
    durationSeconds: 240,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_76"],
    content: [
      {
        type: "text",
        text: "The Lambda Telemetry API allows extensions to receive telemetry data from Lambda — including logs, metrics, and platform events — as they are generated, before they are sent to CloudWatch.\n\nSubscription types:\n• platform – Platform lifecycle events (initStart, initReport, runtimeDone, report)\n• function – All log output from the function code\n• extension – Log output from other extensions\n\nUse cases:\n• Build custom monitoring solutions that send Lambda telemetry to third-party systems (Splunk, Datadog, Sumo Logic)\n• Real-time log routing and transformation\n• Security scanning of logs before they reach CloudWatch\n\nExtensions using the Telemetry API can convert platform events to OpenTelemetry (OTel) format for standards-based observability.",
      },
      {
        type: "quiz",
        question: "What makes the Lambda Telemetry API different from simply reading CloudWatch Logs?",
        options: ["The Telemetry API delivers logs and events in real-time to extensions BEFORE they reach CloudWatch, enabling live routing and transformation", "The Telemetry API provides more detailed metrics", "The Telemetry API is faster than CloudWatch", "The Telemetry API supports structured JSON only"],
        correctAnswer: "The Telemetry API delivers logs and events in real-time to extensions BEFORE they reach CloudWatch, enabling live routing and transformation",
      },
    ],
  },

  // ============================================
  // LAMBDA MODULE 8: LAYERS, EXTENSIONS & RUNTIMES (8 lessons)
  // ============================================
  {
    lessonId: "lambda_lesson_78",
    title: "Creating and Publishing Lambda Layers",
    service: "lambda",
    roles: ["software_development_engineer", "cloud_devops_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_15"],
    content: [
      {
        type: "code",
        code: `# Step 1: Create layer content with proper directory structure
# For Python (dependencies must be in python/ folder)
mkdir -p python/lib/python3.12/site-packages
pip install requests -t python/lib/python3.12/site-packages
zip -r layer.zip python/

# For Node.js (must be in nodejs/node_modules/)
mkdir -p nodejs/node_modules
cd nodejs && npm install lodash && cd ..
zip -r layer.zip nodejs/

# Step 2: Publish the layer to Lambda
aws lambda publish-layer-version \\
  --layer-name my-python-utils \\
  --description "Common Python utilities" \\
  --zip-file fileb://layer.zip \\
  --compatible-runtimes python3.12 python3.11

# Step 3: Add the layer to a function
aws lambda update-function-configuration \\
  --function-name my-function \\
  --layers arn:aws:lambda:us-east-1:123456789012:layer:my-python-utils:1`,
      },
      {
        type: "quiz",
        question: "For a Python Lambda layer, in which directory path must you package your dependencies?",
        options: ["python/ or python/lib/python{version}/site-packages/", "lib/", "dependencies/", "packages/"],
        correctAnswer: "python/ or python/lib/python{version}/site-packages/",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_79",
    title: "Sharing Lambda Layers",
    service: "lambda",
    roles: ["software_development_engineer", "cloud_administrator"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 70,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_78"],
    content: [
      {
        type: "text",
        text: "Lambda layers can be shared across accounts or made public:\n\n• Cross-account sharing: Grant specific AWS accounts permission to use your layer\n• Public layers: Grant permission to all AWS accounts (Principal: *)\n• Layer versions are immutable — each publish creates a new version number\n\nFinding public layers:\nAWS publishes managed layers for popular use cases:\n• AWS SDK for JavaScript (bundled in Node.js runtime)\n• PowerTools for AWS Lambda (TypeScript, Python, Java, .NET)\n• AWS X-Ray SDK\n• Lambda Insights Extension\n\nYou can also use the Lambda console or AWS SAM to discover and use public/shared layers.",
      },
      {
        type: "quiz",
        question: "How do Lambda layer versions behave when you update a layer?",
        options: ["A new version number is created; the old version remains unchanged (immutable)", "The existing version is overwritten in-place", "All functions using the layer auto-update to the new version", "Old versions are automatically deleted after 90 days"],
        correctAnswer: "A new version number is created; the old version remains unchanged (immutable)",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_80",
    title: "Runtime Modifications: Wrapper Scripts",
    service: "lambda",
    roles: ["software_development_engineer"],
    durationSeconds: 240,
    difficulty: "hard",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_9"],
    content: [
      {
        type: "text",
        text: "Wrapper scripts let you customize how Lambda starts a runtime. Lambda calls your script instead of the runtime directly, passing it the original runtime command and arguments.\n\nUse cases:\n• Instrument the runtime startup (e.g., Python -X importtime for profiling)\n• Set additional JVM arguments (Java)\n• Load custom agents at startup\n• Capture metrics about runtime initialization\n\nHow to configure:\n1. Create an executable bash/shell script\n2. Package it in a Lambda Layer\n3. Set the AWS_LAMBDA_EXEC_WRAPPER environment variable to the script path (e.g., /opt/bin/my-wrapper)\n\nNote: Wrapper scripts run for all native runtimes (Node.js, Python, Java, Ruby, .NET). NOT supported on OS-only runtimes (provided.al2023).",
      },
      {
        type: "quiz",
        question: "How do you specify which wrapper script Lambda should use to start the runtime?",
        options: ["Set the AWS_LAMBDA_EXEC_WRAPPER environment variable to the script's path in /opt/", "Add a wrapper key to your function's configuration JSON", "Name the script bootstrap.sh", "Place the script in the root of your deployment package"],
        correctAnswer: "Set the AWS_LAMBDA_EXEC_WRAPPER environment variable to the script's path in /opt/",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_81",
    title: "Custom Runtimes with the Lambda Runtime API",
    service: "lambda",
    roles: ["software_development_engineer"],
    durationSeconds: 300,
    difficulty: "hard",
    xpReward: 110,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_9"],
    content: [
      {
        type: "text",
        text: "Lambda's Runtime API lets you build custom runtimes for any language. A custom runtime is a binary (or script) named `bootstrap` that implements the invocation loop:\n\n1. GET /runtime/invocation/next – Long-poll Lambda to receive the next invocation event (blocks until an event arrives)\n2. Process the event (call your handler)\n3. POST /runtime/invocation/{requestId}/response – Send the result back to Lambda\n4. On error: POST /runtime/init/error or /runtime/invocation/{requestId}/error\n\nThe runtime connects to the Lambda Runtime API endpoint at $AWS_LAMBDA_RUNTIME_API.",
      },
      {
        type: "code",
        code: "#!/bin/bash\n# Example minimal bash custom runtime (bootstrap file)\nset -euo pipefail\n\n# Processing loop\nwhile true\ndo\n  # Get next invocation\n  INVOCATION=$(curl -sS \"http://${AWS_LAMBDA_RUNTIME_API}/2018-06-01/runtime/invocation/next\")\n  REQUEST_ID=$(echo \"$RESPONSE_HEADERS\" | grep Lambda-Runtime-Aws-Request-Id | cut -d' ' -f2 | tr -d '\\r')\n  \n  # Call your handler (pass event via stdin or env var)\n  RESPONSE=$(echo \"$INVOCATION\" | ./handler.sh)\n  \n  # Post response\n  curl -sS -X POST \"http://${AWS_LAMBDA_RUNTIME_API}/2018-06-01/runtime/invocation/$REQUEST_ID/response\" \\\n    -d \"$RESPONSE\"\ndone",
      },
      {
        type: "quiz",
        question: "In the Lambda Runtime API, which HTTP call does a custom runtime use to receive the next invocation event?",
        options: ["GET /runtime/invocation/next (blocks until an event is available)", "POST /runtime/invocation/poll", "GET /runtime/events", "POST /runtime/receive"],
        correctAnswer: "GET /runtime/invocation/next (blocks until an event is available)",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_82",
    title: "Java Lambda Best Practices",
    service: "lambda",
    roles: ["software_development_engineer"],
    durationSeconds: 300,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_4", "lambda_lesson_18"],
    content: [
      {
        type: "text",
        text: "Java on Lambda requires attention to cold start performance due to JVM startup and class loading:\n\n1. Use SnapStart for Java 21+ – Dramatically reduces cold starts by snapshotting the JVM state after initialization\n\n2. Minimize classpath and dependencies – Use only what you need. Avoid heavyweight frameworks like Spring Boot without native compilation.\n\n3. Use native AOT compilation (.NET / GraalVM for Java) – Compile to native binary, eliminating JVM startup overhead\n\n4. Lazy initialization – Defer expensive initialization until first actual use if not all invocations need it\n\n5. Use Amazon Corretto – AWS-optimized JDK that is the default Lambda Java runtime\n\n6. Connection pooling – Use HikariCP for database connections; AWS SDK clients are thread-safe and should be static",
      },
      {
        type: "quiz",
        question: "Which Java Lambda feature can reduce cold starts by up to 90% by snapshotting the initialized JVM state?",
        options: ["Lambda SnapStart (available for Java 21+)", "Provisioned Concurrency with pre-warmed JVMs", "Lazy class loading", "Using a smaller Java runtime"],
        correctAnswer: "Lambda SnapStart (available for Java 21+)",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_83",
    title: "Node.js Lambda Best Practices",
    service: "lambda",
    roles: ["software_development_engineer"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_11"],
    content: [
      {
        type: "text",
        text: "Node.js-specific Lambda best practices:\n\n• Always use async/await handlers (not callbacks). Callback-based handlers are deprecated in Node.js 24+.\n• Enable HTTP keep-alive for AWS SDK connections to reduce latency on warm invocations\n• Use ES Modules (import/export) for better tree-shaking and bundle size reduction\n• Bundle dependencies with esbuild or webpack for smaller deployment packages\n• Use AWS SDK v3 with modular imports — only import the client you need, not the entire SDK\n• For Lambda Managed Instances: avoid mutable global state, use AsyncLocalStorage for request-scoped data\n• Set the NODE_OPTIONS environment variable to enable additional V8 flags",
      },
      {
        type: "quiz",
        question: "Why should you use AWS SDK v3 with modular imports (e.g., import { S3Client } from '@aws-sdk/client-s3') in Node.js Lambda?",
        options: ["To reduce bundle size by only including the SDK clients you actually use (tree-shaking)", "Because v2 doesn't work in Lambda", "To improve security", "To avoid cold starts"],
        correctAnswer: "To reduce bundle size by only including the SDK clients you actually use (tree-shaking)",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_84",
    title: "Python Lambda Best Practices",
    service: "lambda",
    roles: ["software_development_engineer"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_12"],
    content: [
      {
        type: "text",
        text: "Python-specific Lambda best practices:\n\n• Package only needed dependencies in your deployment package\n• Use Lambda Layers for large dependencies (numpy, pandas, scipy) to keep main package small\n• Enable YJIT (Yet Another Ruby JIT) — not Python, but note Python has no JIT by default\n• Use Python's logging module (not print) for proper log levels and structured logging\n• Use type hints for better code clarity and IDE support\n• Leverage Powertools for AWS Lambda (Python) for logging, tracing, and metrics\n• For ML workloads: consider arm64 architecture which has better price-performance\n• Initialize boto3 clients outside the handler: `client = boto3.client('s3')` at module level",
      },
      {
        type: "quiz",
        question: "In Python Lambda, what is the recommended logging approach for better CloudWatch Logs filtering?",
        options: ["Use Python's logging module with appropriate log levels (not bare print statements)", "Use print() with JSON formatting", "Write directly to /tmp/app.log", "Use CloudWatch Logs SDK directly"],
        correctAnswer: "Use Python's logging module with appropriate log levels (not bare print statements)",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_85",
    title: "Runtime Update Modes",
    service: "lambda",
    roles: ["cloud_administrator", "software_development_engineer"],
    durationSeconds: 240,
    difficulty: "hard",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_10"],
    content: [
      {
        type: "text",
        text: "Lambda's Runtime Management Controls let you specify how and when runtime updates are applied:\n\n1. Auto mode (default) – AWS applies runtime updates automatically after testing. New execution environments use the latest runtime version. Provides best security with minimal operational overhead.\n\n2. Function update mode – Runtime is updated only when you update the function (deploy new code or config). Gives you control over update timing.\n\n3. Manual mode – You specify the exact runtime version. No automatic updates. Maximum control but requires you to track and apply updates.\n\nRoll-back: If a runtime update causes issues, you can roll back to the previous runtime version using the console or CLI.",
      },
      {
        type: "quiz",
        question: "Which Lambda runtime update mode requires you to manually specify the exact runtime version, giving maximum control but requiring active management?",
        options: ["Manual mode", "Auto mode", "Function update mode", "Pinned mode"],
        correctAnswer: "Manual mode",
      },
    ],
  },

  // ============================================
  // LAMBDA MODULE 9: ADVANCED FEATURES (8 lessons)
  // ============================================
  {
    lessonId: "lambda_lesson_86",
    title: "Lambda with Kafka (MSK and Self-Managed)",
    service: "lambda",
    roles: ["software_development_engineer", "solutions_architect", "cloud_data_engineer"],
    durationSeconds: 300,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_38"],
    content: [
      {
        type: "text",
        text: "Lambda integrates with Apache Kafka via Event Source Mappings for both Amazon MSK (managed) and self-managed Kafka clusters.\n\nKey configuration settings:\n• StartingPosition: TRIM_HORIZON (oldest), LATEST (newest), or AT_TIMESTAMP\n• BatchSize: 1–10,000 records per invocation\n• ConsumerGroupId: The Kafka consumer group Lambda uses\n• FilterCriteria: Filter which records invoke Lambda\n• Schema Registry: Validate records against Avro, Protobuf, or JSON Schema before invoking Lambda (AWS Glue Schema Registry or Confluent Schema Registry)\n• On-failure destination: Send failed batches to SQS or SNS\n\nAuthentication options for MSK:\n• IAM authentication (recommended for MSK)\n• SASL/SCRAM\n• mTLS (mutual TLS)",
      },
      {
        type: "quiz",
        question: "What feature allows Lambda to validate Kafka messages against an Avro or Protobuf schema BEFORE invoking your function?",
        options: ["Schema Registry integration (AWS Glue Schema Registry or Confluent Schema Registry)", "Event filtering rules", "KMS encryption validation", "Kafka message headers inspection"],
        correctAnswer: "Schema Registry integration (AWS Glue Schema Registry or Confluent Schema Registry)",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_87",
    title: "Lambda with Application Load Balancer",
    service: "lambda",
    roles: ["solutions_architect", "software_development_engineer"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_42"],
    content: [
      {
        type: "text",
        text: "You can register a Lambda function as a target in an Application Load Balancer (ALB) target group. This allows the ALB to route specific paths or host-based rules to Lambda.\n\nKey differences from API Gateway:\n• ALB handles health checks differently for Lambda targets (always returns healthy)\n• ALB supports content-based routing and weighted target groups\n• ALB can route some paths to Lambda and others to EC2/ECS\n• Lower cost at scale vs API Gateway REST API\n• ALB requires a resource-based policy granting elasticloadbalancing.amazonaws.com permission to invoke your function\n\nThe Lambda event format from ALB is similar to API Gateway proxy integration (httpMethod, path, headers, body, queryStringParameters).",
      },
      {
        type: "quiz",
        question: "Why might you choose an ALB as a Lambda trigger over API Gateway for a high-traffic API?",
        options: ["ALB is generally lower cost at scale and supports hybrid architectures routing some traffic to Lambda and some to EC2/ECS", "ALB provides faster cold starts", "ALB provides more Lambda features than API Gateway", "ALB requires less IAM configuration"],
        correctAnswer: "ALB is generally lower cost at scale and supports hybrid architectures routing some traffic to Lambda and some to EC2/ECS",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_88",
    title: "Stateful Processing with Lambda: Time Windows",
    service: "lambda",
    roles: ["software_development_engineer", "cloud_data_engineer"],
    durationSeconds: 300,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_40"],
    content: [
      {
        type: "text",
        text: "Lambda supports stateful stream processing using time-based windows (tumbling windows) for Kinesis and DynamoDB Streams.\n\nHow it works:\n• You specify a window duration (e.g., 5 minutes)\n• Lambda accumulates records within the window and invokes your function\n• Your function can maintain state across multiple invocations within the window by returning a 'state' object in the response\n• Lambda passes the accumulated state to each invocation within the window\n• At the end of the window, Lambda performs a final invocation with isFinalInvokeForWindow: true\n\nUse cases: Count events per time period, calculate rolling averages, aggregate metrics, detect anomalies over time windows.",
      },
      {
        type: "quiz",
        question: "In Lambda's time window processing for Kinesis, how does your function maintain state across multiple invocations within the window?",
        options: ["By returning a 'state' object in the response, which Lambda passes to subsequent invocations in the same window", "By writing to DynamoDB", "By using Lambda's /tmp storage", "By storing state in environment variables"],
        correctAnswer: "By returning a 'state' object in the response, which Lambda passes to subsequent invocations in the same window",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_89",
    title: "Lambda with EFS (Elastic File System)",
    service: "lambda",
    roles: ["software_development_engineer", "solutions_architect"],
    durationSeconds: 240,
    difficulty: "hard",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_20", "lambda_lesson_29"],
    content: [
      {
        type: "text",
        text: "Amazon EFS provides a fully managed, shared file system that Lambda functions can mount. EFS is ideal for:\n• Machine learning model storage (load large models without bundling in deployment)\n• Shared reference data across multiple functions\n• Stateful workloads requiring persistent storage larger than 10 GB /tmp\n• Legacy applications expecting a file system interface\n\nRequirements:\n• Lambda must be in the same VPC as the EFS file system\n• Use EFS access points to limit access to specific directories\n• The execution role must have elasticfilesystem:ClientMount and elasticfilesystem:ClientWrite permissions\n\nPerformance: EFS supports thousands of concurrent Lambda connections. Use EFS Provisioned Throughput for consistent performance.",
      },
      {
        type: "quiz",
        question: "What AWS requirement must be met before a Lambda function can mount an EFS file system?",
        options: ["Lambda must be attached to the same VPC as the EFS file system", "Lambda must use a container image deployment", "Lambda must have provisioned concurrency configured", "Lambda must use Python or Node.js runtime"],
        correctAnswer: "Lambda must be attached to the same VPC as the EFS file system",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_90",
    title: "Lambda S3 Batch Operations Integration",
    service: "lambda",
    roles: ["solutions_architect", "cloud_data_engineer", "software_development_engineer"],
    durationSeconds: 240,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_43"],
    content: [
      {
        type: "text",
        text: "S3 Batch Operations can invoke a Lambda function for each object in a manifest, enabling large-scale per-object processing:\n\nUse cases:\n• Apply transformations to millions of objects\n• Re-encrypt objects with new KMS keys\n• Add watermarks to images\n• Generate thumbnails for existing objects\n• Validate object checksums\n\nHow it works:\n• S3 Batch Operations provides the object details in the Lambda event\n• Your function processes each object and returns a success/failure result\n• Batch Operations generates a completion report with per-object results\n\nYour Lambda function receives: s3BucketArn, s3Key, s3VersionId, and must return a result of either Succeeded, TemporaryFailure, or PermanentFailure for each task.",
      },
      {
        type: "quiz",
        question: "When Lambda is invoked by S3 Batch Operations, what must your function return for each processed object?",
        options: ["A result of Succeeded, TemporaryFailure, or PermanentFailure", "An HTTP 200 status code", "The processed object's new key", "A JSON object with success: true/false"],
        correctAnswer: "A result of Succeeded, TemporaryFailure, or PermanentFailure",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_91",
    title: "Lambda and IoT",
    service: "lambda",
    roles: ["solutions_architect", "software_development_engineer"],
    durationSeconds: 240,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_6"],
    content: [
      {
        type: "text",
        text: "AWS IoT Core can invoke Lambda functions via IoT Rules. When a device publishes an MQTT message that matches a rule query, Lambda is triggered.\n\nCommon IoT + Lambda patterns:\n• Device data processing: Transform and normalize sensor data before storing in DynamoDB or S3\n• Alert generation: Detect anomalous device readings and send SNS notifications\n• Command routing: Route commands from the cloud to specific device fleets\n• Data enrichment: Add metadata to device data before forwarding to analytics pipelines\n\nKey consideration: IoT devices may generate very high event rates. Configure appropriate Lambda concurrency limits to prevent overwhelming downstream systems and manage costs.",
      },
      {
        type: "quiz",
        question: "In an IoT + Lambda architecture, what triggers Lambda to process device messages?",
        options: ["An IoT Core rule that matches the MQTT topic and message content, then invokes Lambda", "The IoT device directly calls the Lambda API", "A CloudWatch alarm on IoT metrics", "An Event Source Mapping polling the IoT queue"],
        correctAnswer: "An IoT Core rule that matches the MQTT topic and message content, then invokes Lambda",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_92",
    title: "Cross-Account Lambda Invocations",
    service: "lambda",
    roles: ["solutions_architect", "cloud_security_engineer"],
    durationSeconds: 300,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_59"],
    content: [
      {
        type: "text",
        text: "Lambda supports cross-account invocations — allowing functions in Account A to invoke functions in Account B.\n\nSetup required:\n\n1. Account B (target function's account) must grant Account A permission in a resource-based policy:\n   • Principal: the IAM role/user ARN in Account A\n   • Action: lambda:InvokeFunction\n   • Resource: the specific function ARN\n\n2. Account A must grant its IAM role permission to call lambda:InvokeFunction on Account B's function\n\nSecurity: Use the Source Account and Source Function ARN conditions to prevent confused deputy attacks. Lambda includes the source function ARN in the STS session for cross-account invocations.",
      },
      {
        type: "quiz",
        question: "For cross-account Lambda invocation, what must the target function's account configure?",
        options: ["A resource-based policy on the function granting the calling account's identity permission to invoke it", "A VPC peering connection between the accounts", "An IAM role in the calling account only", "An S3 bucket for data transfer"],
        correctAnswer: "A resource-based policy on the function granting the calling account's identity permission to invoke it",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_93",
    title: "Lambda and Amazon DocumentDB",
    service: "lambda",
    roles: ["software_development_engineer", "solutions_architect"],
    durationSeconds: 240,
    difficulty: "hard",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_38"],
    content: [
      {
        type: "text",
        text: "Lambda supports Event Source Mappings for Amazon DocumentDB (with MongoDB compatibility). Lambda polls the DocumentDB change stream and invokes your function with batches of change events.\n\nDocumentDB ESM key characteristics:\n• Lambda requires VPC connectivity to the DocumentDB cluster (use VPC configuration + appropriate subnets)\n• Uses PrivateLink (VPC endpoint) for private connectivity without internet access\n• Supports filtering by collection and operation type (INSERT, UPDATE, DELETE)\n• Supports multiple Lambda consumers on the same change stream via different event source mappings\n• Authentication: DocumentDB clusters require username/password stored in Secrets Manager\n\nUse cases: Real-time data synchronization, audit trails, search index updates.",
      },
      {
        type: "quiz",
        question: "What connectivity requirement must be satisfied for Lambda to receive events from an Amazon DocumentDB change stream?",
        options: ["Lambda must be in the same VPC as the DocumentDB cluster (or use VPC peering/PrivateLink)", "Lambda must have internet access", "DocumentDB must be publicly accessible", "Lambda must use a Java runtime"],
        correctAnswer: "Lambda must be in the same VPC as the DocumentDB cluster (or use VPC peering/PrivateLink)",
      },
    ],
  },

  // ============================================
  // LAMBDA MODULE 10: BEST PRACTICES (7 lessons)
  // ============================================
  {
    lessonId: "lambda_lesson_94",
    title: "Lambda Function Code Best Practices",
    service: "lambda",
    roles: ["software_development_engineer", "solutions_architect"],
    durationSeconds: 360,
    difficulty: "medium",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_11"],
    content: [
      {
        type: "text",
        text: "Core Lambda function code best practices:\n\n1. Separate business logic from handler – Makes functions easier to test. Your handler should be thin; business logic lives in separate modules.\n\n2. Initialize SDK clients outside the handler – Reuses connections across warm invocations.\n\n3. Write idempotent handlers – Assume any invocation may be retried. Use idempotency tokens, DynamoDB conditional writes, or Powertools Idempotency to ensure repeated invocations have the same effect.\n\n4. Avoid blocking the event loop (Node.js) – Use async/await consistently. Synchronous operations in Node.js can block all concurrent requests in Lambda Managed Instances.\n\n5. Don't hardcode AWS Region – Use environment variables or SDK auto-detection.\n\n6. Handle errors explicitly – Catch and log all exceptions. Return meaningful error responses to callers.",
      },
      {
        type: "quiz",
        question: "Why must Lambda handlers be designed to be idempotent?",
        options: ["Because Lambda may invoke the same function multiple times for the same event (retries, at-least-once delivery), so duplicate processing must be safe", "Because Lambda functions run in parallel", "Because Lambda clears state between invocations", "To improve performance"],
        correctAnswer: "Because Lambda may invoke the same function multiple times for the same event (retries, at-least-once delivery), so duplicate processing must be safe",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_95",
    title: "Lambda Configuration Best Practices",
    service: "lambda",
    roles: ["software_development_engineer", "solutions_architect", "cloud_administrator"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 80,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_26"],
    content: [
      {
        type: "text",
        text: "Lambda function configuration best practices:\n\n1. Right-size memory – Profile functions with Lambda Power Tuning (open-source tool). Optimal memory is often NOT the minimum.\n\n2. Set timeout conservatively – Timeout should be the function's expected max duration plus a safety buffer. Too short = false failures; too long = unexpected long-running bugs cost money.\n\n3. Use function versions and aliases – Never point event sources at $LATEST in production. Use aliases for stable deployment targets.\n\n4. Set reserved concurrency for critical functions – Protect against account-level throttling caused by other functions.\n\n5. Use environment-specific configuration – Use environment variables or SSM Parameter Store for environment-specific settings (dev/staging/prod).",
      },
      {
        type: "quiz",
        question: "Why should production event sources (API Gateway, SQS, etc.) point to a Lambda alias rather than $LATEST?",
        options: ["Because $LATEST is mutable and always reflects the most recent code changes; an alias points to a stable, tested version", "Because $LATEST has lower performance", "Because $LATEST doesn't support concurrency", "Because aliases are required by AWS policy"],
        correctAnswer: "Because $LATEST is mutable and always reflects the most recent code changes; an alias points to a stable, tested version",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_96",
    title: "Lambda Scalability Best Practices",
    service: "lambda",
    roles: ["solutions_architect", "software_development_engineer"],
    durationSeconds: 300,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_53"],
    content: [
      {
        type: "text",
        text: "Lambda scalability best practices:\n\n1. Use SQS as a buffer – Put SQS between high-traffic sources and Lambda to smooth out traffic spikes and prevent throttling downstream systems\n\n2. Design for statelessness – Don't rely on in-memory state persisting between invocations. Use DynamoDB, ElastiCache, or S3 for state.\n\n3. Test concurrency limits – Load test to understand throttling behavior before production traffic peaks\n\n4. Set per-function reserved concurrency limits – Prevent one Lambda from consuming all account concurrency\n\n5. Implement exponential backoff in callers – Callers should retry throttled requests with exponential backoff and jitter\n\n6. Monitor IteratorAge for streams – High IteratorAge (Kinesis/DynamoDB) indicates Lambda is falling behind; increase BatchSize or ParallelizationFactor",
      },
      {
        type: "quiz",
        question: "How does placing an SQS queue between a high-traffic event source and Lambda improve scalability?",
        options: ["SQS buffers the events and smooths traffic spikes, allowing Lambda to process at a sustainable rate and preventing downstream system overload", "SQS increases Lambda's per-invocation memory", "SQS eliminates cold starts", "SQS provides guaranteed ordering for Lambda events"],
        correctAnswer: "SQS buffers the events and smooths traffic spikes, allowing Lambda to process at a sustainable rate and preventing downstream system overload",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_97",
    title: "Lambda Security Best Practices",
    service: "lambda",
    roles: ["solutions_architect", "cloud_security_engineer"],
    durationSeconds: 300,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_58"],
    content: [
      {
        type: "text",
        text: "Lambda security best practices:\n\n1. Least privilege execution roles – Grant only the specific actions and resources each function needs\n2. One execution role per function – Avoid shared roles across multiple functions\n3. Never embed credentials in code or environment variables – Use IAM roles and Secrets Manager\n4. Validate all input – Never trust event data; sanitize and validate before use\n5. Enable VPC for functions accessing private resources – Prevents unintended internet exposure\n6. Use KMS customer-managed keys for sensitive environment variables\n7. Enable code signing to prevent unauthorized deployments\n8. Scan function code for vulnerabilities using Amazon Inspector or CodeGuru\n9. Use AWS Config rules to detect misconfigured functions\n10. Monitor with CloudTrail, CloudWatch alarms, and Security Hub",
      },
      {
        type: "quiz",
        question: "What is the recommended approach for handling sensitive credentials (DB passwords, API keys) in Lambda?",
        options: ["Store them in AWS Secrets Manager and retrieve in your function; never put them in source code or environment variables directly", "Encrypt them with AES-256 and store in environment variables", "Hardcode them with obfuscation", "Store them in a Lambda Layer"],
        correctAnswer: "Store them in AWS Secrets Manager and retrieve in your function; never put them in source code or environment variables directly",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_98",
    title: "Lambda Cost Optimization",
    service: "lambda",
    roles: ["solutions_architect", "cloud_administrator"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_7"],
    content: [
      {
        type: "text",
        text: "Lambda cost optimization strategies:\n\n1. Right-size memory with Lambda Power Tuning – Find the memory setting that minimizes cost (not always the lowest)\n2. Use arm64 (Graviton2) architecture – ~20% lower cost per GB-second vs x86\n3. Reduce duration – Optimize code, use efficient algorithms, use SDK connection reuse\n4. Reduce invocations – Use SQS batching, event filtering, aggregate events before processing\n5. Avoid unnecessary retries – Fix root causes of errors rather than relying on retries\n6. Use Lifecycle rules for CloudWatch Logs – Set log retention to avoid accumulating log storage costs\n7. Avoid Provisioned Concurrency where not needed – Only use when cold starts are measured to impact UX\n8. Monitor with AWS Cost Explorer – Filter by Lambda function tag to identify expensive functions",
      },
      {
        type: "quiz",
        question: "What open-source tool can help you find the optimal Lambda memory setting to minimize cost?",
        options: ["Lambda Power Tuning (AWS Step Functions-based tool)", "AWS Cost Explorer", "Lambda Insights", "AWS Compute Optimizer"],
        correctAnswer: "Lambda Power Tuning (AWS Step Functions-based tool)",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_99",
    title: "Lambda Working with Streams Best Practices",
    service: "lambda",
    roles: ["software_development_engineer", "solutions_architect"],
    durationSeconds: 300,
    difficulty: "hard",
    xpReward: 100,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_40", "lambda_lesson_39"],
    content: [
      {
        type: "text",
        text: "Best practices for Lambda with streams (Kinesis, DynamoDB Streams) and queues (SQS):\n\n1. Always use partial batch responses – Return batchItemFailures for specific failed records rather than letting the entire batch fail and retry\n\n2. Set appropriate BisectBatchOnFunctionError – Helps isolate bad records by splitting failing batches\n\n3. Configure on-failure destinations – Send unprocessable records to SQS/SNS for analysis instead of blocking the stream\n\n4. Set MaximumRetryAttempts and MaximumRecordAgeInSeconds – Prevent a bad record from blocking the stream indefinitely\n\n5. Monitor IteratorAge – High age indicates Lambda is falling behind; scale by adding shards (Kinesis) or increasing parallelization\n\n6. Use EventBridge Pipes for simple stream routing – Instead of Lambda, use Pipes for filter-enrich-route patterns",
      },
      {
        type: "quiz",
        question: "What is the consequence of NOT using partial batch responses with Kinesis/SQS, when one record in a batch fails?",
        options: ["All records in the batch are retried, including ones that were already processed successfully (duplicate processing risk)", "Only the failed record is retried automatically", "The batch is sent to the DLQ", "Lambda logs an error but continues"],
        correctAnswer: "All records in the batch are retried, including ones that were already processed successfully (duplicate processing risk)",
      },
    ],
  },
  {
    lessonId: "lambda_lesson_100",
    title: "Lambda Observability Best Practices",
    service: "lambda",
    roles: ["software_development_engineer", "solutions_architect", "cloud_devops_engineer"],
    durationSeconds: 300,
    difficulty: "medium",
    xpReward: 90,
    isAdventure: false,
    prerequisiteLessons: ["lambda_lesson_68", "lambda_lesson_71"],
    content: [
      {
        type: "text",
        text: "Complete observability for Lambda functions requires three pillars:\n\n1. Metrics (CloudWatch) – Monitor Invocations, Errors, Throttles, Duration, ConcurrentExecutions. Set alarms on Errors > 0, Throttles > 0, and P99 Duration approaching timeout.\n\n2. Logs (CloudWatch Logs / X-Ray) – Use structured JSON logging. Include requestId, function name, and relevant business context in each log entry. Use log-level filtering to reduce CloudWatch costs in production.\n\n3. Traces (X-Ray) – Enable Active tracing. Instrument downstream calls with X-Ray SDK or ADOT. Use service maps to visualize dependencies and identify bottlenecks.\n\nProduction observability stack: CloudWatch + X-Ray + Lambda Insights + CloudWatch alarms + Powertools for structured logging, metrics, and tracing.",
      },
      {
        type: "quiz",
        question: "What are the three pillars of Lambda observability?",
        options: ["Metrics (CloudWatch), Logs (structured JSON), and Traces (X-Ray)", "CPU, Memory, and Network", "Latency, Throughput, and Availability", "Invocations, Errors, and Duration"],
        correctAnswer: "Metrics (CloudWatch), Logs (structured JSON), and Traces (X-Ray)",
      },
    ],
  },
];