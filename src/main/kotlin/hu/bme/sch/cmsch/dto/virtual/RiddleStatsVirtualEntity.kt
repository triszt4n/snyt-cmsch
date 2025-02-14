package hu.bme.sch.cmsch.dto.virtual

import hu.bme.sch.cmsch.admin.GenerateOverview
import hu.bme.sch.cmsch.admin.OVERVIEW_TYPE_BOOLEAN

data class RiddleStatsVirtualEntity(

    @property:GenerateOverview(visible = false)
    val id: Int,

    @property:GenerateOverview(columnName = "Beadó", order = 1)
    val owner: String,

    @property:GenerateOverview(columnName = "Elfogadott", order = 2, centered = true)
    val completed: Int,

    @property:GenerateOverview(columnName = "Hintek felhasználva", order = 3, centered = true)
    val hintsUsed: Int,

)
