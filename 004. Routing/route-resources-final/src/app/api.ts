import { Injectable, signal } from '@angular/core';

export interface User {
  id: string;
  name: string;
  role: string;
}

export interface Activity {
  range: string;
  items: string[];
}

const users: Record<string, User> = {
  '1': { id: '1', name: 'Ada Lovelace', role: 'Admin' },
  '2': { id: '2', name: 'Grace Hopper', role: 'Editor' },
  '3': { id: '3', name: 'Alan Turing', role: 'Viewer' },
};

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * A fake backend. Every call takes a while, and the calls are counted,
 * so the page can show how often each request really ran.
 */
@Injectable({ providedIn: 'root' })
export class Api {
  readonly calls = signal({ user: 0, activity: 0, feed: 0 });

  private count(kind: 'user' | 'activity' | 'feed') {
    this.calls.update((c) => ({ ...c, [kind]: c[kind] + 1 }));
  }

  async getUser(id: string): Promise<User> {
    this.count('user');
    await wait(800);
    const user = users[id];
    if (!user) throw new Error(`There is no user with id ${id}`);
    return user;
  }

  async getActivity(id: string, range: string): Promise<Activity> {
    this.count('activity');
    await wait(600);
    return { range, items: [`User ${id}: 3 logins this ${range}`, `User ${id}: 5 edits this ${range}`] };
  }

  /** The feed is slow, and it always fails for user 3. */
  async getFeed(id: string): Promise<string[]> {
    this.count('feed');
    await wait(1500);
    if (id === '3') throw new Error('The feed service is down for this user');
    return [`Post from user ${id}`, `Another post from user ${id}`];
  }
}
