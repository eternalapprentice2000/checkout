import * as fs from 'fs'
import { createCommandManager } from './git-command-manager'

export function getWorkingDir(): string {

    let currentWS = process.env['GITHUB_WORKSPACE']

    // original : {{working dir}}/{{repoName}}/{{repoName}}
    // new      : {{working dir}}/{{short-repo-name}}

    let repoName = currentWS.split('\\').pop().split('/').pop()
    let shortenedRepoName = repoName.split('.').pop()
    let workDir = currentWS.substring(currentWS.indexOf(repoName))
    let newWS = workDir + shortenedRepoName

    return newWS  
}

export function directoryExistsSync(path: string, required?: boolean): boolean {
  if (!path) {
    throw new Error("Arg 'path' must not be empty")
  }

  let stats: fs.Stats
  try {
    stats = fs.statSync(path)
  } catch (error) {
    if (error.code === 'ENOENT') {
      if (!required) {
        return false
      }

      throw new Error(`Directory '${path}' does not exist`)
    }

    throw new Error(
      `Encountered an error when checking whether path '${path}' exists: ${error.message}`
    )
  }

  if (stats.isDirectory()) {
    return true
  } else if (!required) {
    return false
  }

  throw new Error(`Directory '${path}' does not exist`)
}

export function existsSync(path: string): boolean {
  if (!path) {
    throw new Error("Arg 'path' must not be empty")
  }

  try {
    fs.statSync(path)
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false
    }

    throw new Error(
      `Encountered an error when checking whether path '${path}' exists: ${error.message}`
    )
  }

  return true
}

export function fileExistsSync(path: string): boolean {
  if (!path) {
    throw new Error("Arg 'path' must not be empty")
  }

  let stats: fs.Stats
  try {
    stats = fs.statSync(path)
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false
    }

    throw new Error(
      `Encountered an error when checking whether path '${path}' exists: ${error.message}`
    )
  }

  if (!stats.isDirectory()) {
    return true
  }

  return false
}
