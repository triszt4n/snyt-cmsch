package hu.bme.sch.g7.service

import hu.bme.sch.g7.dao.RealtimeConfigRepository
import hu.bme.sch.g7.model.RealtimeConfigEntity
import org.slf4j.LoggerFactory
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service
import javax.annotation.PostConstruct

const val WARNING_MESSAGE = "WARNING_MESSAGE"
const val LEADER_BOARD_ENABLED = "LEADER_BOARD_ENABLED"

@Service
class RealtimeConfigService(
        private val realtimeConfig: RealtimeConfigRepository
) {

    private val log = LoggerFactory.getLogger(javaClass)
    private val cache: MutableMap<String, String> = mutableMapOf()

    @PostConstruct
    fun init() {
        if (realtimeConfig.findByKey(WARNING_MESSAGE).isEmpty)
            realtimeConfig.save(RealtimeConfigEntity(0, WARNING_MESSAGE, ""))

        if (realtimeConfig.findByKey(LEADER_BOARD_ENABLED).isEmpty)
            realtimeConfig.save(RealtimeConfigEntity(0, LEADER_BOARD_ENABLED, "true"))
    }

    fun resetCache() {
        log.info("Clearing realtime config cache")
        cache.clear()
    }

    fun getWarningMessage(): String {
        return cache.computeIfAbsent(WARNING_MESSAGE) { key ->
            realtimeConfig.findByKey(key)
                    .map { it.value }
                    .orElse("")
        }
    }

    fun isLeaderBoardEnabled(): Boolean {
        return cache.computeIfAbsent(LEADER_BOARD_ENABLED) { key ->
            realtimeConfig.findByKey(key)
                    .map { it.value }
                    .orElse("false")
        }.equals("true", ignoreCase = true)
    }

}