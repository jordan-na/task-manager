import { v4 as uuid} from 'uuid';

const boards = [
   {
      id: uuid(),
      title: "Platform Launch",
      columns: [
         {
            id: uuid(),
            title: "todo",
            color: "#41c0ea",
            tasks: [
               {
                  id: uuid(),
                  task: "Build UI for onboarding flow",
                  description:
                     "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem ea numquam voluptatem praesentium corrupti at dolores quisquam. Iste quidem delectus, perspiciatis mollitia accusamus deleniti impedit officiis! Tempora, nihil reiciendis! Temporibus.",
                  subtasks: [
                     {
                        id: uuid(),
                        subtask: "subtask 1",
                        done: false,
                     },
                     {
                        id: uuid(),
                        subtask: "subtask 2",
                        done: false,
                     },
                  ],
               },
               {
                  id: uuid(),
                  task: "Build UI for search",
                  description:
                     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error tempora temporibus placeat, recusandae ut autem doloremque ullam maiores alias porro ipsam nobis nam, magnam hic mollitia excepturi odio, esse quis.",
                  subtasks: [
                     {
                        id: uuid(),
                        subtask: "subtask 1",
                        done: false,
                     },
                     {
                        id: uuid(),
                        subtask: "subtask 2",
                        done: false,
                     },
                  ],
               },
            ],
         },
         {
            id: uuid(),
            title: "doing",
            color: "#8470f3",
            tasks: [
               {
                  id: uuid(),
                  task: "Design settings and search pages",
                  description:
                     "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae qui asperiores fugiat ducimus quae, tempore iure at in numquam quasi dolorum temporibus officiis vel repellat laudantium nulla distinctio molestias necessitatibus?",
                  subtasks: [
                     {
                        id: uuid(),
                        subtask: "subtask 1",
                        done: true,
                     },
                     {
                        id: uuid(),
                        subtask: "subtask 2",
                        done: false,
                     },
                     {
                        id: uuid(),
                        subtask: "subtask 3",
                        done: false,
                     },
                  ],
               },
               {
                  id: uuid(),
                  task: "Add account management endpoints",
                  description:
                     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur laborum distinctio iure perspiciatis. Accusamus omnis eveniet vel nemo adipisci reiciendis quidem doloremque quia. Nisi dolorum reiciendis illo unde autem dolores.",
                  subtasks: [
                     {
                        id: uuid(),
                        subtask: "subtask 1",
                        done: true,
                     },
                     {
                        id: uuid(),
                        subtask: "subtask 2",
                        done: true,
                     },
                     {
                        id: uuid(),
                        subtask: "subtask 3",
                        done: false,
                     },
                  ],
               },
            ],
         },
         {
            id: uuid(),
            title: "done",
            color: "#65e7b0",
            tasks: [
               {
                  id: uuid(),
                  task: "Conduct 5 wireframe tests",
                  description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt dolorum laudantium unde mollitia eos perspiciatis aperiam qui ratione accusantium vitae dolorem reiciendis, distinctio, laboriosam voluptates, ex ea fugit sequi blanditiis!",
                  subtasks: [
                     {
                        id: uuid(),
                        subtask: "subtask 1",
                        done: true,
                     },
                  ],
               },
               {
                  id: uuid(),
                  task: "Review results of usability tests and iterate",
                  description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam illum error totam minima similique, beatae aspernatur voluptatem officia. Consequatur sequi perspiciatis, commodi earum laboriosam porro accusamus corrupti. Soluta, eos consectetur?",
                  subtasks: [
                     {
                        id: uuid(),
                        subtask: "subtask 1",
                        done: true,
                     },
                     {
                        id: uuid(),
                        subtask: "subtask 2",
                        done: true,
                     },
                     {
                        id: uuid(),
                        subtask: "subtask 3",
                        done: true,
                     },
                  ],
               },
            ],
         },
      ],
   },
];

export default boards;
