import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { TasksController } from './tasks.controller';
import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';

const moduleMocker = new ModuleMocker(global);

const mockTask = {
	"id": "6b646b24-e3a7-4a50-9030-51a8977b1544",
	"title": "test",
	"description": "do something",
	"status": "OPEN"
  }

const mockTasksResults = [mockTask];

const mockUser = {
	username: 'testuser', 
	id: 'someId', 
	password: 'somePassword', 
	tasks: []
}

describe('TasksController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TasksController],
    })
      .useMocker((token) => {

        if (token === TasksService) {
          return { 
			getTasks: jest.fn().mockResolvedValue(mockTasksResults), 
			getTaskById: jest.fn().mockResolvedValue(mockTask), 
		 };
        }

        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(token,) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }

      })
      .compile();

    controller = moduleRef.get(TasksController);
  });

  describe('getTasks', () => {

    it('should return an array of tasks', async () => {

      expect(await controller.getTasks(null, mockUser)).toBe(mockTasksResults);

    });

  });

  describe('getTaskById', () => {

    it('should return a single task', async () => {

      expect(await controller.getTaskById('someid', mockUser)).toBe(mockTask);

    });

  });

});
