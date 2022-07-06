package hu.bme.sch.cmsch.service

import hu.bme.sch.cmsch.dto.TokenCollectorStatus
import hu.bme.sch.cmsch.dto.TokenDto
import hu.bme.sch.cmsch.model.RiddleCategoryEntity
import hu.bme.sch.cmsch.model.RiddleMappingEntity
import hu.bme.sch.cmsch.model.TokenPropertyEntity
import hu.bme.sch.cmsch.model.UserEntity
import hu.bme.sch.cmsch.repository.*
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Isolation
import org.springframework.transaction.annotation.Transactional

@Service
open class TokenCollectorService(
    private val clock: ClockService,
    private val riddleRepository: RiddleRepository,
    private val riddleMappingRepository: RiddleMappingRepository,
    private val riddleCategoryRepository: RiddleCategoryRepository
) {

    @Transactional(readOnly = false, isolation = Isolation.SERIALIZABLE)
    open fun collectToken(userEntity: UserEntity, token: String): Pair<String?, TokenCollectorStatus> {
        val riddle = riddleRepository.findAllBySolution(token).firstOrNull()
        if (riddle != null) {
            if (riddleMappingRepository.findByOwnerUserAndRiddle_Id(userEntity, riddle.id).isPresent)
                return Pair(riddle.title, TokenCollectorStatus.ALREADY_SCANNED)

            riddleMappingRepository.save(RiddleMappingEntity(0, riddle, userEntity, null, false, true, clock.getTimeInSeconds(), 1))
            return Pair(riddle.title, TokenCollectorStatus.SCANNED)
        }
        return Pair(null, TokenCollectorStatus.WRONG)
    }

    @Transactional(readOnly = true)
    fun getTokensForUser(user: UserEntity): List<TokenDto> {
        return riddleMappingRepository.findAllByOwnerUser_Id(user.id)
            .map { TokenDto(it.riddle?.title ?: "n/a", riddleCategoryRepository.findById(it.riddle?.categoryId ?: -1).orElse(
                RiddleCategoryEntity(title = "n/a")
            ).title) }
    }

    @Transactional(readOnly = true)
    fun getTotalTokenCount(): Int {
        return riddleRepository.findAll().size
    }

}
