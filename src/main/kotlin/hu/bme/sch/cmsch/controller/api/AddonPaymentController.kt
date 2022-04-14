package hu.bme.sch.cmsch.controller.api

import com.fasterxml.jackson.annotation.JsonView
import hu.bme.sch.cmsch.component.debt.SoldProductRepository
import hu.bme.sch.cmsch.dto.DebtDto
import hu.bme.sch.cmsch.dto.FullDetails
import hu.bme.sch.cmsch.service.RealtimeConfigService
import hu.bme.sch.cmsch.util.getUser
import org.springframework.ui.Model
import javax.servlet.http.HttpServletRequest

//@Controller
class AddonPaymentController(
    private val config: RealtimeConfigService,
    private val debtsRepository: SoldProductRepository,
) {

    @JsonView(FullDetails::class)
//    @GetMapping("/pay")
    fun profile(request: HttpServletRequest, model: Model): String {
        val user = request.getUser()
        if (config.isSiteLowProfile())
            return "403"

        model.addAttribute("user", user)
        val debts = debtsRepository.findAllByOwnerId(user.id)
                .map {
                    DebtDto(
                            it.product,
                            it.price,
                            it.sellerName,
                            it.responsibleName,
                            it.payed,
                            it.shipped,
                            it.log,
                            it.materialIcon
                    )
                }
        model.addAttribute("debts", debts)
        model.addAttribute("sumDebts", debts
                .filter { !it.payed }
                .sumOf { it.price })
        return "addonPayments"
    }

}
