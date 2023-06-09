import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, HealthCheck } from '@nestjs/terminus';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('health')
@ApiTags('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation({ summary: 'Health Check Endpoint for PBCWAI-DBMS' })
  @ApiResponse({
    status: 200,
    description: 'PBCWAI-DBMS Basic Health Check',
    type: 'Health Check',
  })
  check() {
    return this.health.check([
      () => this.http.pingCheck('/api/products', 'http://localhost:3000/api/products'),
    ]);
  }
}
