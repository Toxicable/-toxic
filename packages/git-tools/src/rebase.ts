import { exec } from 'child_process';
import { log, colors } from './logger';
import SimpleGit from 'simple-git';
const simpleGit = SimpleGit();

export function rebase(numberOfCommits: number) {
  log(colors.FgBlue, `Rebasing last ${numberOfCommits} commits`);
  exec('git ');

}
