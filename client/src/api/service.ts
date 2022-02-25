import { Choice } from "@/models/Choice";
import axios, { AxiosResponse } from "axios";
import { plainToInstance } from "class-transformer";

export default class Service {
  endpoint!: string;
  operation_endpoint!: string;
  full_endpoint!: string;
  constructor(endpoint: string, operation_endpoint: string) {
    this.endpoint = endpoint;
    this.operation_endpoint = operation_endpoint;
    this.full_endpoint = this.endpoint + this.operation_endpoint;
  }

  async create(proposal: string): Promise<Choice> {
    const response = await axios.post(`${this.full_endpoint}/`, { proposal });
    return this.toChoice(response) as Choice;
  }
  async list(offset: number, limit: number): Promise<Choice[]> {
    const response = await axios.get(this.full_endpoint, {
      params: {
        offset: offset,
        limit: limit,
      },
    });
    return this.toChoice(response) as Choice[];
  }
  async get(id: number): Promise<Choice> {
    const response = await axios.get(`${this.full_endpoint}/${id}/`);
    return this.toChoice(response) as Choice;
  }

  async up_vote(id: number): Promise<Choice> {
    const response = await axios.post(`${this.full_endpoint}/${id}/upvote/`);
    return this.toChoice(response) as Choice;
  }
  async down_vote(id: number): Promise<Choice> {
    return await axios
      .post(`${this.full_endpoint}/${id}/downvote/`)
      .then((response) => this.toChoice(response) as Choice);
  }

  private toChoice(response: AxiosResponse<any, any>): Choice[] | Choice {
    const data = response.data;

    if ("results" in data) {
      return plainToInstance(Choice, data.results);
    }
    return plainToInstance(Choice, data) as unknown as Choice;
  }
}
