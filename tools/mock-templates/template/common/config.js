let interfaceEnv = ENV
if (interfaceEnv === 'stg') {
  interfaceEnv = 'stg'
} else if (interfaceEnv === 'dev') {
  interfaceEnv = 'dev'
} else if (interfaceEnv === 'prd') {
  interfaceEnv = 'prd'
} else {
  interfaceEnv = 'mock'
}

export default {
  env: interfaceEnv
}
