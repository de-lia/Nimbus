import { Adventure } from "../../../types/adventure";

export const kinesisAdventures: Adventure[] = [
  {
    adventureId: "kinesis_adventure_1",
    title: "Build a Real-Time Data Stream",
    description: "Create a Kinesis data stream and process streaming data",
    service: "kinesis",
    roles: ["developer", "solutions_architect", "data_engineer"],
    difficulty: "hard",
    xpReward: 400,
    badge: "streaming_expert",
    steps: [
      {
        stepId: "step_1",
        description: "Create a Kinesis Data Stream",
        completed: false
      },
      {
        stepId: "step_2",
        description: "Configure stream with appropriate shard count",
        completed: false
      },
      {
        stepId: "step_3",
        description: "Write a producer to send data to the stream",
        completed: false
      },
      {
        stepId: "step_4",
        description: "Create a consumer to read from the stream",
        completed: false
      },
      {
        stepId: "step_5",
        description: "Monitor stream metrics in CloudWatch",
        completed: false
      }
    ]
  },
];
